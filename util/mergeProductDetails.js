/**
 * Merge scraped product details (dealer notes, features) with existing inventory
 */

const fs = require('fs');
const path = require('path');

function mergeProductDetails() {
  console.log('🔄 Merging product details with inventory...\n');
  
  // Load existing inventory
  const inventoryPath = path.join(__dirname, '../data/inventory.json');
  const inventory = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));
  console.log(`✅ Loaded ${inventory.length} products from inventory.json`);
  
  // Check if enhanced inventory exists
  const enhancedPath = path.join(__dirname, '../data/inventory-enhanced.json');
  if (!fs.existsSync(enhancedPath)) {
    console.log('❌ No enhanced inventory found at data/inventory-enhanced.json');
    console.log('   Please run the scraper first: node util/scrapeWithPlaywright.js');
    return;
  }
  
  // Load enhanced inventory with dealer notes
  const enhanced = JSON.parse(fs.readFileSync(enhancedPath, 'utf8'));
  console.log(`✅ Loaded ${enhanced.length} products from inventory-enhanced.json`);
  
  // Create a map for quick lookup
  const enhancedMap = new Map();
  enhanced.forEach(item => {
    if (item.productId) {
      enhancedMap.set(item.productId, item);
    }
  });
  
  // Merge the data
  let mergedCount = 0;
  const merged = inventory.map(item => {
    const enhancedItem = enhancedMap.get(item.productId);
    
    if (enhancedItem && (enhancedItem.dealerNotes || enhancedItem.productFeatures)) {
      mergedCount++;
      return {
        ...item,
        dealerNotes: enhancedItem.dealerNotes || item.dealerNotes || '',
        productFeatures: enhancedItem.productFeatures || item.productFeatures || '',
        specs: {
          ...item.specs,
          ...(enhancedItem.specs || {})
        }
      };
    }
    
    return item;
  });
  
  // Backup original inventory
  const backupPath = path.join(__dirname, '../data/inventory-backup.json');
  fs.writeFileSync(backupPath, JSON.stringify(inventory, null, 2));
  console.log(`\n📦 Backed up original inventory to inventory-backup.json`);
  
  // Save merged inventory
  fs.writeFileSync(inventoryPath, JSON.stringify(merged, null, 2));
  console.log(`✅ Updated inventory.json with dealer notes for ${mergedCount} products`);
  
  // Show sample of merged data
  const sampleProduct = merged.find(p => p.dealerNotes);
  if (sampleProduct) {
    console.log('\n📝 Sample merged product:');
    console.log(`   Title: ${sampleProduct.title}`);
    console.log(`   Dealer Notes: ${sampleProduct.dealerNotes?.substring(0, 100)}...`);
  }
  
  console.log('\n✨ Merge complete!');
}

// Run the merger
mergeProductDetails();
