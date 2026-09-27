import puppeteer from "puppeteer-core";

async function main() {
  const browser = await puppeteer.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
    args: ["--no-sandbox", "--disable-gpu", "--window-size=1440,900"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });

  page.on("pageerror", (err) => {
    consoleErrors.push(err.toString());
  });

  console.log("Navigating to http://localhost:3000...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });

  // Get total scroll height and section offset
  const sectionInfo = await page.evaluate(() => {
    const el = document.getElementById("construction-journey");
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      top: rect.top + scrollTop,
      height: el.offsetHeight,
      windowHeight: window.innerHeight,
    };
  });

  console.log("Section Info:", sectionInfo);

  if (!sectionInfo) {
    throw new Error("Could not find #construction-journey section!");
  }

  // Helper to scroll with instant behavior
  async function scrollToProgress(progress) {
    const scrollDistance = sectionInfo.height - sectionInfo.windowHeight;
    const targetY = sectionInfo.top + scrollDistance * progress;
    await page.evaluate((y) => {
      window.scrollTo({ top: y, behavior: "instant" });
      window.dispatchEvent(new Event("scroll"));
    }, targetY);
    await new Promise((r) => setTimeout(r, 400));
  }

  // 1. 0% progress (fully exploded)
  await scrollToProgress(0.02);
  await page.screenshot({ path: "public/images/journey/journey-0-exploded.png" });
  console.log("Captured journey-0-exploded.png");

  // 2. 25% progress (foundation anchors)
  await scrollToProgress(0.25);
  await page.screenshot({ path: "public/images/journey/journey-25-foundation.png" });
  console.log("Captured journey-25-foundation.png");

  // 3. 50% progress (structure docks)
  await scrollToProgress(0.5);
  await page.screenshot({ path: "public/images/journey/journey-50-structure.png" });
  console.log("Captured journey-50-structure.png");

  // 4. 75% progress (walls & interior dock)
  await scrollToProgress(0.75);
  await page.screenshot({ path: "public/images/journey/journey-75-walls.png" });
  console.log("Captured journey-75-walls.png");

  // 5. 100% progress (roof docks, fully assembled)
  await scrollToProgress(1.0);
  await page.screenshot({ path: "public/images/journey/journey-100-assembled.png" });
  console.log("Captured journey-100-assembled.png");

  // 6. Reverse back to 0%
  await scrollToProgress(0.02);
  await page.screenshot({ path: "public/images/journey/journey-reversed.png" });
  console.log("Captured journey-reversed.png");

  console.log("Console Errors:", consoleErrors);
  console.log("Validation complete! Total errors:", consoleErrors.length);

  await browser.close();
}

main().catch((err) => {
  console.error("Phase 2 validation error:", err);
  process.exit(1);
});
