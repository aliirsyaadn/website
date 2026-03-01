import { chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        viewport: { width: 375, height: 812 },
        isMobile: true
    });
    const page = await context.newPage();

    try {
        // Check Home
        await page.goto('http://localhost:5179/');
        await page.waitForTimeout(1000);
        await page.screenshot({ path: '/tmp/mobile_home.png', fullPage: true });

        // Check About
        await page.goto('http://localhost:5179/about');
        await page.waitForSelector('.page-enter');
        await page.screenshot({ path: '/tmp/mobile_about.png', fullPage: true });

        // Check Blog List
        await page.goto('http://localhost:5179/blog');
        await page.waitForTimeout(1000);
        await page.screenshot({ path: '/tmp/mobile_blog.png', fullPage: true });

        console.log('Mobile screenshots captured successfully!');
    } catch (error) {
        console.error('Test failed:', error.message);
    } finally {
        await browser.close();
    }
})();
