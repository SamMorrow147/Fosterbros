/**
 * Check scraper progress
 */

const fs = require('fs');
const path = require('path');

console.log('📊 Checking scraper progress...\n');

// Check if scraper is running
const { execSync } = require('child_process');
try {
  const ps = execSync('ps aux | grep "scrapeAllDealerNotes" | grep -v grep').toString();
  if (ps) {
    console.log('✅ Scraper is running\n');
  }
} catch (e) {
  console.log('⚠️  Scraper may have finished or stopped\n');
}

// Check log file
const logPath = path.join(__dirname, '../scraper-log.txt');
if (fs.existsSync(logPath)) {
  const log = fs.readFileSync(logPath, 'utf8');
  const lines = log.split('\n');
  const lastLines = lines.slice(-15).join('\n');
  console.log('📝 Last 15 lines of log:\n');
  console.log(lastLines);
  console.log('\n');
}

// Check progress file
const progressPath = path.join(__dirname, '../data/inventory-progress.json');
if (fs.existsSync(progressPath)) {
  const progress = JSON.parse(fs.readFileSync(progressPath, 'utf8'));
  const withNotes = progress.filter(p => p.dealerNotes && p.dealerNotes.length > 100).length;
  console.log(`\n📈 Progress: ${withNotes} of 63 products have dealer notes\n`);
} else {
  console.log('\n⏳ Scraper hasn't saved progress yet...\n');
}

// Check main inventory
const inventoryPath = path.join(__dirname, '../data/inventory.json');
const inventory = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));
const withNotes = inventory.filter(p => p.dealerNotes && p.dealerNotes.length > 100).length;
console.log(`📊 Current inventory: ${withNotes} of ${inventory.length} products have dealer notes\n`);

console.log('💡 To view live progress: tail -f scraper-log.txt\n');
