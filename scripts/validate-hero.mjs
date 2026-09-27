import puppeteer from "puppeteer-core";

async function main() {
  const browser = await puppeteer.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
    args: ["--no-sandbox", "--disable-gpu", "--window-size=1440,900"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleLogs = [];
  const consoleErrors = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    } else {
      consoleLogs.push(msg.text());
    }
  });

  page.on("pageerror", (err) => {
    consoleErrors.push(err.toString());
  });

  console.log("Navigating to http://localhost:3000...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });

  // Initial screenshot
  await page.screenshot({ path: "public/images/home/scroll-top.png" });
  console.log("Captured scroll-top.png");

  // Scroll down to 300px
  await page.evaluate(() => window.scrollTo(0, 300));
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: "public/images/home/scroll-300px.png" });
  console.log("Captured scroll-300px.png");

  // Scroll down to 600px
  await page.evaluate(() => window.scrollTo(0, 600));
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: "public/images/home/scroll-600px.png" });
  console.log("Captured scroll-600px.png");

  // Scroll back up to 0px (reverse scroll verification)
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: "public/images/home/scroll-reversed.png" });
  console.log("Captured scroll-reversed.png");

  console.log("Console Errors:", consoleErrors);
  console.log("Validation complete! Total errors:", consoleErrors.length);

  await browser.close();
}

main().catch((err) => {
  console.error("Script error:", err);
  process.exit(1);
});
