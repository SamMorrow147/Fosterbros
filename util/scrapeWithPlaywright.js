
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
    
    console.log(`Scraping: ${item.title}`);
    
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
      console.error(`Failed to scrape ${item.url}: ${error.message}`);
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
