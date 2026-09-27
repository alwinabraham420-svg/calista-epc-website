import puppeteer from "puppeteer-core";

const executablePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

async function waitForAllImages(page) {
  await page.evaluate(async () => {
    const selectors = Array.from(document.querySelectorAll("img"));
    selectors.forEach((img) => {
      img.loading = "eager";
    });

    await Promise.all(
      selectors.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.addEventListener("load", resolve);
          img.addEventListener("error", resolve);
        });
      })
    );
  });
}

async function validate() {
  console.log("Launching headless Chrome...");
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const consoleErrors = [];

  // 1. Desktop Validation (1440 x 900)
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });

  console.log("Navigating to http://localhost:3000 on Desktop...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle2" });
  
  console.log("Waiting for all images to complete loading...");
  await waitForAllImages(page);
  await new Promise((r) => setTimeout(r, 1000));

  // Check horizontal overflow
  const desktopOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log("Desktop horizontal overflow detected:", desktopOverflow);

  // Capture full page screenshot
  await page.screenshot({
    path: "public/images/home/rendered-homepage-desktop.png",
    fullPage: true
  });
  console.log("Captured full desktop page: rendered-homepage-desktop.png");

  // 2. Mobile Validation (390 x 844)
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });

  mobilePage.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(`[Mobile] ${msg.text()}`);
    }
  });

  console.log("Navigating to http://localhost:3000 on Mobile (390x844)...");
  await mobilePage.goto("http://localhost:3000", { waitUntil: "networkidle2" });
  await waitForAllImages(mobilePage);
  await new Promise((r) => setTimeout(r, 1000));

  const mobileOverflow = await mobilePage.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log("Mobile horizontal overflow detected:", mobileOverflow);

  await mobilePage.screenshot({
    path: "public/images/home/rendered-homepage-mobile.png",
    fullPage: true
  });
  console.log("Captured full mobile page: rendered-homepage-mobile.png");

  console.log("Total console errors:", consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log("Errors:", consoleErrors);
  }

  await browser.close();
  console.log("Validation complete!");
}

validate().catch((err) => {
  console.error("Validation failed:", err);
  process.exit(1);
});
