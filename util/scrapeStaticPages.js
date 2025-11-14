const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');

const pagesToScrape = [
    { url: 'https://www.fosterbrosmarine.com/paddleboats', slug: 'paddleboats' },
    { url: 'https://www.fosterbrosmarine.com/ultralegs', slug: 'ultralegs' },
    { url: 'https://www.fosterbrosmarine.com/traxstech', slug: 'traxstech' },
    { url: 'https://www.fosterbrosmarine.com/hondaoutboards', slug: 'hondaoutboards' },
    { url: 'https://www.fosterbrosmarine.com/yamahaoutboards', slug: 'yamahaoutboards' },
    { url: 'https://www.fosterbrosmarine.com/service-request', slug: 'service-request' },
    { url: 'https://www.fosterbrosmarine.com/winterization-storage', slug: 'winterization-storage' },
    { url: 'https://www.fosterbrosmarine.com/winterize-liability-form', slug: 'winterize-liability-form' },
    { url: 'https://www.fosterbrosmarine.com/pontoon-trailer-rentals', slug: 'pontoon-trailer-rentals' },
    { url: 'https://www.fosterbrosmarine.com/about', slug: 'about' },
    { url: 'https://www.fosterbrosmarine.com/events', slug: 'events' },
    { url: 'https://www.fosterbrosmarine.com/financing', slug: 'financing' },
    { url: 'https://www.fosterbrosmarine.com/annual-water-demo', slug: 'annual-water-demo' },
    { url: 'https://www.fosterbrosmarine.com/careers', slug: 'careers' },
    { url: 'https://www.fosterbrosmarine.com/bass-cat', slug: 'bass-cat' },
    { url: 'https://www.fosterbrosmarine.com/factory-promotions', slug: 'factory-promotions' }
];

async function scrapePageContent(page, url) {
    console.log(`📄 Scraping: ${url}`);
    
    try {
        // Set extra headers to look more like a real browser
        await page.setExtraHTTPHeaders({
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Referer': 'https://www.google.com/',
        });
        
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
        
        // Wait longer for dynamic content and Cloudflare challenge
        await page.waitForTimeout(5000);
        
        const pageData = await page.evaluate(() => {
            // Get the main content area
            const mainContent = document.querySelector('main') || 
                              document.querySelector('#main') || 
                              document.querySelector('.main-content') ||
                              document.querySelector('article') ||
                              document.querySelector('.content') ||
                              document.querySelector('#content');
            
            // Get title
            const title = document.querySelector('h1')?.innerText || 
                         document.querySelector('title')?.innerText || 
                         'Page';
            
            // Get all headings and content
            const content = mainContent ? mainContent.innerHTML : document.body.innerHTML;
            
            // Get meta description
            const metaDescription = document.querySelector('meta[name="description"]')?.content || '';
            
            // Get images in the main content
            const images = Array.from(mainContent?.querySelectorAll('img') || []).map(img => ({
                src: img.src,
                alt: img.alt || ''
            }));
            
            return {
                title,
                content,
                metaDescription,
                images
            };
        });
        
        return pageData;
        
    } catch (error) {
        console.error(`❌ Error scraping ${url}:`, error.message);
        return null;
    }
}

async function main() {
    console.log('🚀 Starting static page scraper...\n');
    
    const browser = await chromium.launch({
        headless: false,  // Run in visible mode to pass Cloudflare
        args: ['--disable-blink-features=AutomationControlled']
    });
    
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        viewport: { width: 1920, height: 1080 },
        locale: 'en-US',
        timezoneId: 'America/Chicago',
    });
    
    const page = await context.newPage();
    
    const results = {};
    
    for (const pageInfo of pagesToScrape) {
        const data = await scrapePageContent(page, pageInfo.url);
        if (data) {
            results[pageInfo.slug] = data;
            console.log(`✅ Successfully scraped: ${pageInfo.slug}\n`);
        }
        
        // Small delay between requests
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    await browser.close();
    
    // Save results to JSON file
    const outputPath = path.join(__dirname, '../data/static-pages.json');
    await fs.writeFile(outputPath, JSON.stringify(results, null, 2));
    
    console.log(`\n✅ Scraping complete! Data saved to: ${outputPath}`);
    console.log(`📊 Total pages scraped: ${Object.keys(results).length}`);
}

main().catch(console.error);

