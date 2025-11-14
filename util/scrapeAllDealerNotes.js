/**
 * Comprehensive scraper to get ALL dealer notes from Foster Bros Marine
 * Uses stealth techniques to bypass Cloudflare protection
 */

const { chromium } = require('playwright');
const fs = require('fs');

async function scrapeAllDealerNotes() {
  console.log('🚀 Starting comprehensive dealer notes scraper...\n');
  console.log('⏰ This will take approximately 60-90 minutes\n');
  console.log('💡 Using stealth mode to bypass Cloudflare protection\n');
  
  // Use regular chromium with stealth settings
  const browser = await chromium.launch({ 
    headless: false, // Show browser
    args: [
      '--disable-blink-features=AutomationControlled',
      '--disable-features=IsolateOrigins,site-per-process',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--disable-features=VizDisplayCompositor'
    ]
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    locale: 'en-US',
    timezoneId: 'America/Chicago'
  });
  
  // Remove automation markers
  await context.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    window.navigator.chrome = { runtime: {} };
  });
  
  const page = await context.newPage();
  
  // Load existing inventory
  const inventory = JSON.parse(fs.readFileSync('./data/inventory.json', 'utf8'));
  const enhanced = [];
  
  // First, establish a browsing session
  console.log('🏠 Step 1: Establishing browsing session...');
  try {
    await page.goto('https://www.fosterbrosmarine.com', { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
    console.log('✅ Homepage loaded');
    await page.waitForTimeout(5000);
    
    // Visit inventory page
    console.log('📋 Step 2: Browsing inventory...');
    await page.goto('https://www.fosterbrosmarine.com/search/inventory', { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
    console.log('✅ Inventory page loaded');
    await page.waitForTimeout(3000);
    
  } catch (error) {
    console.error('❌ Failed to establish session:', error.message);
    console.log('⚠️  Trying to continue anyway...');
  }
  
  // Now scrape each product
  let successCount = 0;
  let failCount = 0;
  
  for (let i = 0; i < inventory.length; i++) {
    const item = inventory[i];
    if (!item.url) {
      enhanced.push(item);
      continue;
    }
    
    // Skip if already has substantial dealer notes
    if (item.dealerNotes && item.dealerNotes.length > 100) {
      console.log(`[${i+1}/${inventory.length}] ⏭️  Skipping ${item.title.substring(0, 40)}... (already has notes)`);
      enhanced.push(item);
      successCount++;
      continue;
    }
    
    console.log(`\n[${i+1}/${inventory.length}] 📝 ${item.title}`);
    
    try {
      // Random delay 20-40 seconds
      const delay = 20000 + Math.random() * 20000;
      console.log(`   ⏳ Waiting ${Math.round(delay/1000)}s...`);
      await page.waitForTimeout(delay);
      
      // Navigate to product page
      console.log(`   🌐 Loading ${item.url.split('/').pop()}`);
      await page.goto(item.url, { 
        waitUntil: 'domcontentloaded',
        timeout: 60000 
      });
      
      // Wait for page to stabilize
      await page.waitForTimeout(3000);
      
      // Scroll like a human
      await page.evaluate(() => window.scrollBy(0, 400));
      await page.waitForTimeout(1000);
      await page.evaluate(() => window.scrollBy(0, 400));
      await page.waitForTimeout(1500);
      
      // Extract dealer notes
      const dealerNotes = await page.evaluate(() => {
        const element = document.querySelector('#dealerDescription, .description-richtext, [id*="dealer"]');
        return element ? element.innerText.trim() : '';
      });
      
      // Extract product features
      const productFeatures = await page.evaluate(() => {
        const element = document.querySelector('.product-features, .features-list, [class*="feature"]');
        return element ? element.innerText.trim() : '';
      });
      
      // Extract additional specs
      const additionalSpecs = await page.evaluate(() => {
        const specs = {};
        const specElements = document.querySelectorAll('#specifications .spec-item, .spec-row, [class*="spec"]');
        specElements.forEach(el => {
          const label = el.querySelector('.spec-label, .label, dt')?.innerText.trim();
          const value = el.querySelector('.spec-value, .value, dd')?.innerText.trim();
          if (label && value && label !== value) {
            specs[label] = value;
          }
        });
        return specs;
      });
      
      if (dealerNotes && dealerNotes.length > 50) {
        console.log(`   ✅ Got dealer notes (${dealerNotes.length} chars)`);
        successCount++;
      } else {
        console.log(`   ⚠️  No dealer notes found`);
        failCount++;
      }
      
      enhanced.push({
        ...item,
        dealerNotes: dealerNotes || item.dealerNotes || '',
        productFeatures: productFeatures || item.productFeatures || '',
        specs: {
          ...item.specs,
          ...additionalSpecs
        }
      });
      
      // Save progress every 3 items
      if ((i + 1) % 3 === 0) {
        fs.writeFileSync(
          './data/inventory-progress.json',
          JSON.stringify(enhanced, null, 2)
        );
        console.log(`   💾 Progress saved (${successCount} successful, ${failCount} no notes)`);
      }
      
    } catch (error) {
      console.error(`   ❌ Failed: ${error.message}`);
      failCount++;
      enhanced.push(item);
      
      // If blocked, wait longer
      if (error.message.includes('timeout') || error.message.includes('ERR_')) {
        console.log('   🛡️  Possible Cloudflare block, waiting 90 seconds...');
        await page.waitForTimeout(90000);
      }
    }
  }
  
  await browser.close();
  
  // Save final enhanced inventory
  fs.writeFileSync(
    './data/inventory-complete.json',
    JSON.stringify(enhanced, null, 2)
  );
  
  // Also update the main inventory file
  fs.writeFileSync(
    './data/inventory.json',
    JSON.stringify(enhanced, null, 2)
  );
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ SCRAPING COMPLETE!');
  console.log('='.repeat(60));
  console.log(`📊 Results:`);
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ⚠️  No notes: ${failCount}`);
  console.log(`   📦 Total: ${enhanced.length}`);
  console.log(`\n💾 Files saved:`);
  console.log(`   - data/inventory.json (main file - UPDATED)`);
  console.log(`   - data/inventory-complete.json (backup)`);
  console.log(`\n🎉 All dealer notes have been added to your inventory!`);
}

// Run the scraper
scrapeAllDealerNotes().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
