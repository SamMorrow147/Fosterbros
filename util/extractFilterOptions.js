// Script to extract all unique filter values from inventory data
const fs = require('fs');
const path = require('path');

// Load inventory data
const inventoryPath = path.join(__dirname, '../data/inventory.json');
const inventory = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));

// Extract unique values for each field
const extractUniqueValues = (field) => {
  const values = new Set();
  inventory.forEach(item => {
    if (item[field] !== null && item[field] !== undefined && item[field] !== '') {
      values.add(item[field]);
    }
  });
  return Array.from(values).sort();
};

// Extract numeric ranges
const extractRange = (field) => {
  const values = inventory
    .map(item => item[field])
    .filter(val => val !== null && val !== undefined && !isNaN(val));
  
  if (values.length === 0) return null;
  
  return {
    min: Math.min(...values),
    max: Math.max(...values),
    values: [...new Set(values)].sort((a, b) => a - b)
  };
};

// Extract all filter options
const filterOptions = {
  // Categorical filters
  types: extractUniqueValues('type'),
  usage: extractUniqueValues('usage'),
  brands: extractUniqueValues('brand'),
  makes: extractUniqueValues('make'),
  categories: extractUniqueValues('category'),
  styles: extractUniqueValues('style'),
  availability: extractUniqueValues('availability'),
  fuelTypes: extractUniqueValues('fuelType'),
  engineTypes: extractUniqueValues('engineType'),
  locations: extractUniqueValues('location'),
  
  // Numeric filters with ranges
  years: extractRange('year'),
  prices: extractRange('price'),
  lengths: extractRange('length'),
  beams: extractRange('beam'),
  horsepowers: extractRange('horsepower'),
  
  // Extract specs fields
  specFields: new Set()
};

// Extract unique spec fields
inventory.forEach(item => {
  if (item.specs && typeof item.specs === 'object') {
    Object.keys(item.specs).forEach(key => {
      filterOptions.specFields.add(key);
    });
  }
});

filterOptions.specFields = Array.from(filterOptions.specFields).sort();

// Save to file
const outputPath = path.join(__dirname, '../data/extractedFilterOptions.json');
fs.writeFileSync(outputPath, JSON.stringify(filterOptions, null, 2));

console.log('Filter options extracted successfully!');
console.log('\nSummary:');
console.log('Types:', filterOptions.types.length);
console.log('Usage:', filterOptions.usage.length);
console.log('Brands:', filterOptions.brands.length);
console.log('Categories:', filterOptions.categories.length);
console.log('Years:', filterOptions.years?.values?.length || 0);
console.log('Price range:', filterOptions.prices?.min, '-', filterOptions.prices?.max);
console.log('Spec fields:', filterOptions.specFields.length);
