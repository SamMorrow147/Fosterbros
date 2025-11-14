/**
 * Slow scraper that mimics human behavior to avoid Cloudflare detection
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function slowScrape() {
  console.log('🐌 Starting slow, human-like scraping...\n');
  
  const browser = await chromium.launch({ 
    headless: false, // Show browser so you can see what's happening
    args: [
      '--disable-blink-features=AutomationControlled',
      '--disable-features=IsolateOrigins,site-per-process'
    ]
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  
  const page = await context.newPage();
  
  // Load existing inventory
  const inventory = JSON.parse(fs.readFileSync('./data/inventory.json', 'utf8'));
  const enhanced = [];
  
  console.log('⏰ This will take about 30-60 minutes to avoid detection.');
  console.log('💡 TIP: You can browse other sites while this runs.\n');
  
  // First, visit the homepage to establish a session
  console.log('🏠 Visiting homepage first to establish session...');
  await page.goto('https://www.fosterbrosmarine.com', { 
    waitUntil: 'networkidle',
    timeout: 60000 
  });
  
  // Wait like a human would
  await page.waitForTimeout(5000 + Math.random() * 3000);
  
  // Click around a bit to seem human
  console.log('👆 Clicking around to appear human...');
  await page.goto('https://www.fosterbrosmarine.com/search/inventory', { 
    waitUntil: 'networkidle',
    timeout: 60000 
  });
  
  await page.waitForTimeout(3000 + Math.random() * 2000);
  
  // Now scrape each product slowly
  for (let i = 0; i < inventory.length; i++) {
    const item = inventory[i];
    if (!item.url) continue;
    
    console.log(`📝 [${i+1}/${inventory.length}] Scraping: ${item.title}`);
    
    try {
      // Random delay between 15-30 seconds per page
      const delay = 15000 + Math.random() * 15000;
      console.log(`   ⏳ Waiting ${Math.round(delay/1000)}s before next request...`);
      await page.waitForTimeout(delay);
      
      // Navigate to product page
      await page.goto(item.url, { 
        waitUntil: 'networkidle',
        timeout: 60000 
      });
      
      // Wait for content to load
      await page.waitForTimeout(3000 + Math.random() * 2000);
      
      // Scroll like a human would
      await page.evaluate(() => {
        window.scrollBy(0, 300);
      });
      await page.waitForTimeout(1000);
      
      await page.evaluate(() => {
        window.scrollBy(0, 300);
      });
      await page.waitForTimeout(1000);
      
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
      
      console.log(`   ✅ Got dealer notes: ${dealerNotes ? dealerNotes.substring(0, 50) + '...' : 'None'}`);
      
      enhanced.push({
        ...item,
        dealerNotes,
        productFeatures
      });
      
      // Save progress every 5 items
      if ((i + 1) % 5 === 0) {
        fs.writeFileSync(
          './data/inventory-enhanced-partial.json',
          JSON.stringify(enhanced, null, 2)
        );
        console.log(`   💾 Progress saved (${enhanced.length} items)`);
      }
      
    } catch (error) {
      console.error(`   ❌ Failed: ${error.message}`);
      enhanced.push(item); // Keep original if scraping fails
      
      // If we hit Cloudflare, wait longer
      if (error.message.includes('Verifying') || error.message.includes('Cloudflare')) {
        console.log('   🛡️ Cloudflare detected! Waiting 60 seconds...');
        await page.waitForTimeout(60000);
      }
    }
  }
  
  await browser.close();
  
  // Save final enhanced inventory
  fs.writeFileSync(
    './data/inventory-enhanced.json',
    JSON.stringify(enhanced, null, 2)
  );
  
  console.log('\n✅ Scraping complete! Enhanced data saved to inventory-enhanced.json');
}

// Add sample data for testing
function addSampleDealerNotes() {
  console.log('📝 Adding sample dealer notes for testing...\n');
  
  const inventory = JSON.parse(fs.readFileSync('./data/inventory.json', 'utf8'));
  
  // Add sample dealer notes to first 3 products
  const sampleNotes = [
    {
      dealerNotes: "The Falcon has a great ride and tons of floor space for fishing. The Falcons are a great boat for trolling and jigging the lakes for walleye or salmon. They also make a great boat for the rivers chasing big Flatheads and Channel Cats or Sturgeon.\n\nThis boat has the following factory options on it; Hydraulic Steering, Air Rides Pedestals, 2- 24\" Painted Storage Bench's, Sport Steering, Livewell in Bow, Rear boarding platform, Bimini/Side Curtains/Drop Curtain, 12V Powerpoint/USB, Additional Auto Bilge pump, Windshield Wipers.\n\nThis boat is powered by a 115hp Yamaha SHO motor and sits on an EZ-Loader Trailer. For more information, give us a call and ask for Gary or Mark.",
      productFeatures: "Hydraulic Steering\nAir Ride Pedestals\nDual Storage Benches\nSport Steering\nBow Livewell\nRear Boarding Platform\nComplete Canvas Package\n12V/USB Charging\nAuto Bilge Pump\nWindshield Wipers"
    },
    {
      dealerNotes: "This premium pontoon offers the perfect blend of luxury and performance. Ideal for family outings, entertaining guests, or just relaxing on the water.\n\nFeaturing plush seating throughout, premium sound system, and LED lighting package. The powerful Yamaha outboard provides excellent performance while maintaining fuel efficiency.\n\nStop by our showroom to see this beautiful boat in person!",
      productFeatures: "Premium Seating Package\nBluetooth Sound System\nLED Lighting\nBimini Top\nDocking Lights\nSki Tow Bar"
    },
    {
      dealerNotes: "Built for serious anglers, this fishing machine comes fully equipped with everything you need for a successful day on the water.\n\nThe deep V hull provides a smooth, dry ride even in rough conditions. Large casting decks fore and aft give you plenty of room to work.",
      productFeatures: "Trolling Motor\nFish Finder/GPS Combo\nLivewell System\nRod Storage\nTackle Storage"
    }
  ];
  
  // Apply sample notes to first few products
  const enhanced = inventory.map((item, index) => {
    if (index < sampleNotes.length) {
      return {
        ...item,
        ...sampleNotes[index]
      };
    }
    return item;
  });
  
  // Save enhanced inventory
  fs.writeFileSync(
    './data/inventory.json',
    JSON.stringify(enhanced, null, 2)
  );
  
  console.log(`✅ Added sample dealer notes to ${sampleNotes.length} products`);
  console.log('📋 You can now view these on the product detail pages');
}

// Check command line arguments
const args = process.argv.slice(2);

if (args.includes('--sample')) {
  // Just add sample data for testing
  addSampleDealerNotes();
} else if (args.includes('--slow')) {
  // Run the slow scraper
  slowScrape().catch(console.error);
} else {
  console.log(`
Usage:
  node util/scrapeSlow.js --sample   # Add sample dealer notes for testing
  node util/scrapeSlow.js --slow     # Run slow scraper (takes 30-60 min)
  
Recommended: Start with --sample to test the display, then run --slow overnight.
  `);
}
