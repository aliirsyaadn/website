import { chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    try {
        // Check Blog Index
        await page.goto('http://localhost:5178/blog');
        const blogTitle = await page.title();
        console.log('Blog Index Title:', blogTitle);

        // Check AI Agents Blog and Mermaid Rendering
        await page.goto('http://localhost:5178/blog/ai-agent-skills-and-coding-assistants');

        // Wait for the mermaid library to convert the <pre class="mermaid"> to an SVG
        await page.waitForSelector('svg[id^="mermaid-"]', { timeout: 5000 });

        // Take a screenshot of the hydrated diagram
        const mermaidElement = await page.$('.mermaid');
        if (mermaidElement) {
            await mermaidElement.screenshot({ path: '/tmp/mermaid_ai_agents_test.png' });
            console.log('Successfully rendered and captured Mermaid SVG for AI Agents!');
        }

    } catch (error) {
        console.error('Test failed:', error.message);
    } finally {
        await browser.close();
    }
})();
