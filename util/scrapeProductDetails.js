/**
 * Script to scrape additional product details (dealer notes, features) from Foster Bros Marine
 * This enhances the existing inventory.json with rich product descriptions
 */

const fs = require('fs');
const path = require('path');

// Instructions for scraping product details
console.log(`
=================================================================
SCRAPING PRODUCT DETAILS FROM FOSTER BROS MARINE
=================================================================

Since we need to scrape dealer notes and product features from each product page,
here are your options:

OPTION 1: Using Playwright (Automated - Recommended)
-----------------------------------------------------
1. Install Playwright:
   npm install playwright

2. Run this script:
   node util/scrapeWithPlaywright.js

OPTION 2: Using Firecrawl (Easiest)
------------------------------------
1. Go to https://www.firecrawl.dev/dashboard
2. Create a new "Scrape" job (not crawl)
3. Add all product URLs from inventory.json
4. Set extraction schema:
   {
     "dealerNotes": "div#dealerDescription",
     "productFeatures": "div.product-features",
     "specs": "div#specifications"
   }
5. Export and save as productDetails.json

OPTION 3: Manual Browser Extension
-----------------------------------
1. Install Web Scraper Chrome Extension
2. Create a sitemap with:
   - Start URL: https://www.fosterbrosmarine.com/search/inventory
   - Link selector: a.media-container
   - Data selectors:
     * dealerNotes: div#dealerDescription
     * productId: extract from URL
     * features: div.product-features
3. Export as CSV/JSON

OPTION 4: Using Apify
---------------------
1. Use the "Website Content Crawler" actor
2. Input all product URLs
3. Set Page function:
   async function pageFunction(context) {
     const { $, request } = context;
     const productId = request.url.match(/(\d+i)$/)?.[1];
     
     return {
       productId,
       url: request.url,
       dealerNotes: $('#dealerDescription').text().trim(),
       productFeatures: $('.product-features').text().trim(),
       specifications: $('#specifications').html()
     };
   }

CURRENT INVENTORY URLs TO SCRAPE:
---------------------------------
`);

// Load current inventory and extract URLs
const inventoryPath = path.join(__dirname, '../data/inventory.json');
const inventory = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));

// Generate list of URLs to scrape
const urls = inventory.map(item => item.url).filter(url => url);
console.log(`Found ${urls.length} product URLs to scrape:\n`);
urls.forEach((url, index) => {
  if (index < 10) {
    console.log(`${index + 1}. ${url}`);
  }
});
if (urls.length > 10) {
  console.log(`... and ${urls.length - 10} more\n`);
}

// Save URLs to file for easy copying
const urlsPath = path.join(__dirname, '../data/productUrlsToScrape.txt');
fs.writeFileSync(urlsPath, urls.join('\n'));
console.log(`\n✅ All URLs saved to: data/productUrlsToScrape.txt`);
console.log(`   (You can copy these URLs into your scraping tool)\n`);

// Create Playwright scraper if requested
const createPlaywrightScript = `
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function scrapeProductDetails() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  const inventory = JSON.parse(fs.readFileSync('./data/inventory.json', 'utf8'));
  const enhanced = [];
  
  for (const item of inventory) {
    if (!item.url) continue;
    
    console.log(\`Scraping: \${item.title}\`);
    
    try {
      await page.goto(item.url, { waitUntil: 'networkidle' });
      
      // Wait for content to load
      await page.waitForTimeout(2000);
      
      // Extract dealer notes
      const dealerNotes = await page.evaluate(() => {
        const element = document.querySelector('#dealerDescription');
        return element ? element.innerText.trim() : '';
      });
      
      // Extract product features
      const productFeatures = await page.evaluate(() => {
        const element = document.querySelector('.product-features');
        return element ? element.innerText.trim() : '';
      });
      
      // Extract additional specs
      const additionalSpecs = await page.evaluate(() => {
        const specs = {};
        const specElements = document.querySelectorAll('#specifications .spec-item');
        specElements.forEach(el => {
          const label = el.querySelector('.spec-label')?.innerText.trim();
          const value = el.querySelector('.spec-value')?.innerText.trim();
          if (label && value) {
            specs[label] = value;
          }
        });
        return specs;
      });
      
      enhanced.push({
        ...item,
        dealerNotes,
        productFeatures,
        specs: { ...item.specs, ...additionalSpecs }
      });
      
      // Small delay to avoid overwhelming the server
      await page.waitForTimeout(1000);
      
    } catch (error) {
      console.error(\`Failed to scrape \${item.url}: \${error.message}\`);
      enhanced.push(item); // Keep original if scraping fails
    }
  }
  
  await browser.close();
  
  // Save enhanced inventory
  fs.writeFileSync(
    './data/inventory-enhanced.json',
    JSON.stringify(enhanced, null, 2)
  );
  
  console.log('✅ Scraping complete! Enhanced data saved to inventory-enhanced.json');
}

scrapeProductDetails();
`;

// Save Playwright script
const playwrightScriptPath = path.join(__dirname, 'scrapeWithPlaywright.js');
fs.writeFileSync(playwrightScriptPath, createPlaywrightScript);
console.log(`\n📝 Playwright scraper script created at: util/scrapeWithPlaywright.js`);
console.log(`   Run it with: node util/scrapeWithPlaywright.js\n`);

console.log(`=================================================================\n`);
