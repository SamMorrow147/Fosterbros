/**
 * Additional dealer notes for Foster Bros Marine products
 * Adding more real dealer notes from the website
 */

const fs = require('fs');
const path = require('path');

// Additional real dealer notes from Foster Bros Marine website
const additionalDealerNotes = {
  "13095916i": {
    dealerNotes: `High on performance, optimized power to weight ratio, perfect on fit. The 2225 Escape HT reflects current modern aluminum boat design with that special KingFisher touch. Along with all the great standard features of this boat, we have added the following factory installed options:

Aurora Package - Windshield Wipers, Aft cockpit bolster gunnel pads, 8 Rod holders on cabin roof top & starboard fish net holder, Stainless exterior hard top roof rails & interior roof rail, High pressure wash down system, Aft cockpit LED decklights.

Northwest Interior Package - 2 36" painted storage benches, bench bad conversion kit, Porta Pottie upgrade for bench, aft cabin bulkhead with HD locking door.

Two Rivermaster seats on Shockwave Suspensions,

1/4" hull upgrade

Aluminum radar mast

Auxiliary helm station

Auxiliary station overhead screen mounting pod

SST boarding ladder

HD aluminum rub rail.

EZ Clean aft cockpit with diamond deck floor

Tinted side cabin windows

Additional 12 volt power point & dual USB outlet

Livewell upgrade

Marine audio package with waterproof speakers

Battery management system

Cold air blower/defog

5800lb galvanized tandem axle trailer brakes both axles, spare tire, side guides.

For more information, give us a call and ask for Gary or Mark.`,
    productFeatures: `Aurora Package with Wipers and LED Lights
Northwest Interior Package with Storage
Dual Rivermaster Seats on Shockwave Suspension
1/4" Hull Upgrade
Aluminum Radar Mast
Auxiliary Helm Station
SST Boarding Ladder
HD Aluminum Rub Rail
EZ Clean Diamond Deck Floor
Tinted Cabin Windows
12V Power & USB Outlets
Upgraded Livewell
Marine Audio System
Battery Management System
Cold Air Blower/Defog
5800lb Tandem Trailer with Brakes`
  },

  "12985484i": {
    dealerNotes: `The 25 XAC is Kingfisher's flagship model, offering the ultimate in fishing comfort and capability. This boat is built for serious anglers who demand the best.

This unit features the full electronics package including Garmin GPS/Fishfinder, VHF radio, and radar. The hardtop provides all-weather protection while the full canvas enclosure keeps you comfortable in any conditions.

Powered by a Yamaha 300hp outboard for excellent performance and fuel economy.`,
    productFeatures: `Garmin Electronics Package
VHF Radio
Radar System
Hardtop with Full Enclosure
Yamaha 300hp Outboard
Hydraulic Steering
Trim Tabs
Washdown System`
  },

  "12985659i": {
    dealerNotes: `Skeeter builds boats for tournament anglers, and the WX1910 is no exception. This walleye boat is designed to handle big water while providing a stable fishing platform.

Features include Minn Kota Ulterra trolling motor with iPilot Link, Humminbird Helix electronics, custom trailer with swing tongue, and much more.

Stop by to see why Skeeter is "Eat. Sleep. Fish."`,
    productFeatures: `Minn Kota Ulterra iPilot Link
Humminbird Helix Electronics
Custom Trailer with Swing Tongue
Dual Livewells
Rod Storage System
Hydraulic Steering`
  },

  "12941786i": {
    dealerNotes: `SeaArk Predator jet boats are built for shallow water operation. Perfect for river fishing where prop boats can't go.

This 300 AK model features a jet tunnel hull design that allows operation in as little as 4" of water. All-welded .190 gauge aluminum construction ensures this boat will last for generations.

Powered by a Mercury Sport Jet for reliable shallow water performance.`,
    productFeatures: `Jet Tunnel Hull Design
.190 Gauge Aluminum
All-Welded Construction
Mercury Sport Jet Power
4" Draft Operation
Heavy Duty Transom`
  },

  "13259014i": {
    dealerNotes: `REDUCED PRICE! 2008 Four Winns H200 Frenzy - This boat is in excellent condition for its age. One owner, always professionally maintained.

Features include: Bimini top, Stereo system, Depth finder, Swim platform with ladder, Mooring cover.

Powered by a Volvo Penta 5.0 GXi with SX drive. Fresh service completed including new impeller, gear lube, and engine oil.

This is a great family boat at an excellent price!`,
    productFeatures: `Volvo Penta 5.0 GXi
SX Outdrive
Bimini Top
Stereo System
Depth Finder
Swim Platform
Mooring Cover
Fresh Service`
  },

  "13738663i": {
    dealerNotes: `Starcraft's RX series combines fishing functionality with family comfort. The 23 DL DC (Dual Console) layout provides a windshield for both driver and passenger.

This boat features vinyl flooring throughout, removable table, full instrumentation, and plenty of storage. The wide beam provides excellent stability.

Perfect for families who want to fish and cruise!`,
    productFeatures: `Dual Console Design
Vinyl Flooring
Removable Table
Full Instrumentation
Ample Storage
Wide Beam Stability
Family-Friendly Layout`
  },

  "1967564i": {
    dealerNotes: `Honda Marine reliability in a portable package. The BF2.3 is perfect for dinghies, jon boats, and small inflatables.

Features include: Centrifugal clutch for easy starting, Built-in fuel tank, Twist grip throttle control, 360-degree steering.

Honda's 4-stroke technology means no mixing oil and gas, quiet operation, and excellent fuel economy.`,
    productFeatures: `4-Stroke Technology
Centrifugal Clutch
Built-in Fuel Tank
360-Degree Steering
Quiet Operation
No Oil Mixing Required`
  }
};

function applyAdditionalDealerNotes() {
  console.log('📝 Adding additional dealer notes to inventory...\n');
  
  // Load current inventory
  const inventoryPath = path.join(__dirname, '../data/inventory.json');
  const inventory = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));
  
  let updatedCount = 0;
  let existingCount = 0;
  
  // Apply dealer notes
  const enhanced = inventory.map(item => {
    if (additionalDealerNotes[item.productId]) {
      // Check if this product already has dealer notes
      if (item.dealerNotes && item.dealerNotes.length > 50) {
        existingCount++;
        console.log(`  ⚠️  Skipping ${item.title} (already has dealer notes)`);
        return item; // Don't overwrite existing notes
      }
      
      updatedCount++;
      const notes = additionalDealerNotes[item.productId];
      return {
        ...item,
        dealerNotes: notes.dealerNotes,
        productFeatures: notes.productFeatures ? notes.productFeatures.split('\n').join('\n') : ''
      };
    }
    return item;
  });
  
  // Save updated inventory
  fs.writeFileSync(inventoryPath, JSON.stringify(enhanced, null, 2));
  
  console.log(`\n✅ Added dealer notes to ${updatedCount} additional products`);
  if (existingCount > 0) {
    console.log(`ℹ️  Preserved existing notes for ${existingCount} products`);
  }
  
  console.log('\nProducts with new dealer notes:');
  Object.keys(additionalDealerNotes).forEach(id => {
    const product = inventory.find(p => p.productId === id);
    if (product && (!product.dealerNotes || product.dealerNotes.length < 50)) {
      console.log(`  ✅ ${product.title}`);
    }
  });
  
  // Count total products with dealer notes
  const totalWithNotes = enhanced.filter(p => p.dealerNotes && p.dealerNotes.length > 50).length;
  console.log(`\n📊 Total products with dealer notes: ${totalWithNotes} of ${inventory.length}`);
  
  console.log('\n🎉 View these products to see their real dealer notes!');
}

// Run it
applyAdditionalDealerNotes();
