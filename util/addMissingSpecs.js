/**
 * Add missing specs to specific products
 */

const fs = require('fs');
const path = require('path');

// Detailed specs for products that need them
const productSpecs = {
  "13095916i": { // 2026 Kingfisher Boats 2225 Escape HT
    hours: "0",
    length: 24,
    beam: 96, // 8' 0" = 96 inches
    horsepower: 250,
    fuelType: "Gas",
    engineType: "Outboard 4 Stroke",
    specs: {
      "Primary Color": "Aston Green",
      "Trim Color": "Gray",
      "Engine Make": "Yamaha",
      "Engine Model": "F250",
      "Engine Year": "2025",
      "Hull Type": "Aluminum",
      "Trailer Type": "Bunk Trailer",
      "Dry Weight": "2495",
      "Hull Material": "Aluminum",
      "# of Axles": "2",
      "# of Engines": "1"
    },
    stockNumber: "KF-9473G",
    vin: "QBSY9473G526"
  }
};

function addMissingSpecs() {
  console.log('📝 Adding missing specs to products...\n');
  
  // Load current inventory
  const inventoryPath = path.join(__dirname, '../data/inventory.json');
  const inventory = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));
  
  let updatedCount = 0;
  
  // Apply specs
  const enhanced = inventory.map(item => {
    if (productSpecs[item.productId]) {
      updatedCount++;
      const newSpecs = productSpecs[item.productId];
      
      console.log(`✅ Updating ${item.title}`);
      console.log(`   Adding: ${Object.keys(newSpecs.specs || {}).length} spec fields`);
      
      return {
        ...item,
        hours: newSpecs.hours || item.hours,
        length: newSpecs.length || item.length,
        beam: newSpecs.beam || item.beam,
        horsepower: newSpecs.horsepower || item.horsepower,
        fuelType: newSpecs.fuelType || item.fuelType,
        engineType: newSpecs.engineType || item.engineType,
        stockNumber: newSpecs.stockNumber || item.stockNumber,
        vin: newSpecs.vin || item.vin,
        specs: {
          ...item.specs,
          ...newSpecs.specs
        }
      };
    }
    return item;
  });
  
  // Save updated inventory
  fs.writeFileSync(inventoryPath, JSON.stringify(enhanced, null, 2));
  
  console.log(`\n✅ Updated ${updatedCount} products with detailed specs`);
  console.log('🎉 Specs have been added to the Overview section!');
}

// Run it
addMissingSpecs();
