/**
 * Filter Engine - Core filtering logic for inventory
 * Supports all Foster Bros Marine filter types
 */

/**
 * Filters inventory based on provided filter criteria
 * @param {Array} data - Full inventory array
 * @param {Object} filters - Filter criteria object
 * @returns {Array} - Filtered inventory array
 */
export function filterInventory(data, filters = {}) {
  if (!data || !Array.isArray(data)) {
    return [];
  }

  return data
    // Multi-select filters (arrays)
    .filter(item => {
      // Types filter
      if (filters.types && Array.isArray(filters.types) && filters.types.length > 0) {
        if (!filters.types.includes(item.type)) return false;
      }
      // Single type filter (backwards compatibility)
      else if (filters.type && filters.type !== '' && filters.type !== 'All Types') {
        if (item.type !== filters.type) return false;
      }
      return true;
    })
    .filter(item => {
      // Usage filter (multi-select)
      if (filters.usage && Array.isArray(filters.usage) && filters.usage.length > 0) {
        if (!filters.usage.includes(item.usage)) return false;
      }
      // Single usage filter (backwards compatibility)
      else if (filters.usage && !Array.isArray(filters.usage) && filters.usage !== '' && filters.usage !== 'All Usage') {
        if (item.usage !== filters.usage) return false;
      }
      return true;
    })
    .filter(item => {
      // Brands filter (multi-select)
      if (filters.brands && Array.isArray(filters.brands) && filters.brands.length > 0) {
        if (!filters.brands.includes(item.brand) && !filters.brands.includes(item.make)) return false;
      }
      // Single brand/make filter (backwards compatibility)
      else if (filters.brand || filters.make) {
        const brandFilter = filters.brand || filters.make;
        if (brandFilter !== '' && brandFilter !== 'All Makes') {
          if (item.brand !== brandFilter && item.make !== brandFilter) return false;
        }
      }
      return true;
    })
    .filter(item => {
      // Categories/Class filter
      if (filters.categories && Array.isArray(filters.categories) && filters.categories.length > 0) {
        if (!filters.categories.includes(item.category)) return false;
      }
      return true;
    })
    .filter(item => {
      // Years filter (multi-select)
      if (filters.years && Array.isArray(filters.years) && filters.years.length > 0) {
        if (!filters.years.includes(item.year)) return false;
      }
      // Single year filter (backwards compatibility)
      else if (filters.year && !Array.isArray(filters.year) && filters.year !== '' && filters.year !== 'All Years') {
        if (item.year !== parseInt(filters.year)) return false;
      }
      return true;
    })
    .filter(item => {
      // Availability/Inventory Status filter
      if (filters.availability && Array.isArray(filters.availability) && filters.availability.length > 0) {
        if (!filters.availability.includes(item.availability)) return false;
      }
      return true;
    })
    .filter(item => {
      // Fuel Types filter
      if (filters.fuelTypes && Array.isArray(filters.fuelTypes) && filters.fuelTypes.length > 0) {
        if (!item.fuelType || !filters.fuelTypes.includes(item.fuelType)) return false;
      }
      return true;
    })
    .filter(item => {
      // Engine Types filter
      if (filters.engineTypes && Array.isArray(filters.engineTypes) && filters.engineTypes.length > 0) {
        if (!item.engineType || !filters.engineTypes.includes(item.engineType)) return false;
      }
      return true;
    })
    // Style filter
    .filter(item => {
      if (!filters.style || filters.style === '' || filters.style === 'All Styles') {
        return true;
      }
      return item.style === filters.style;
    })
    // Year range filter
    .filter(item => {
      if (filters.minYear && item.year < filters.minYear) {
        return false;
      }
      if (filters.maxYear && item.year > filters.maxYear) {
        return false;
      }
      return true;
    })
    // Price range filter
    .filter(item => {
      if (filters.minPrice && item.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice && item.price < filters.maxPrice) {
        return false;
      }
      return true;
    })
    // Length range filter
    .filter(item => {
      if (!item.length) return true; // Skip items without length (motors)
      if (filters.minLength && item.length < filters.minLength) {
        return false;
      }
      if (filters.maxLength && item.length > filters.maxLength) {
        return false;
      }
      return true;
    })
    // Beam range filter
    .filter(item => {
      if (!item.beam) return true; // Skip items without beam (motors)
      if (filters.minBeam && item.beam < filters.minBeam) {
        return false;
      }
      if (filters.maxBeam && item.beam > filters.maxBeam) {
        return false;
      }
      return true;
    })
    // Horsepower filter
    .filter(item => {
      if (!filters.horsepower) {
        return true;
      }
      return item.horsepower === parseInt(filters.horsepower);
    })
    // Fuel type filter
    .filter(item => {
      if (!filters.fuelType || filters.fuelType === '' || filters.fuelType === 'All Fuel Types') {
        return true;
      }
      return item.fuelType === filters.fuelType;
    })
    // Engine type filter
    .filter(item => {
      if (!filters.engineType || filters.engineType === '' || filters.engineType === 'All Engine Types') {
        return true;
      }
      return item.engineType === filters.engineType;
    });
}

/**
 * Count how many items match the current filters
 * @param {Array} data - Full inventory array
 * @param {Object} filters - Filter criteria
 * @returns {Number} - Count of matching items
 */
export function getFilteredCount(data, filters = {}) {
  return filterInventory(data, filters).length;
}

/**
 * Get unique values for a field from filtered data
 * Used for dynamic filter options
 * @param {Array} data - Inventory array
 * @param {String|Object} fieldOrFilters - Field name to extract OR current filters object
 * @param {Object} currentFilters - Current active filters (optional if first param is object)
 * @returns {Array|Object} - Unique values sorted OR object with all options and counts
 */
export function getAvailableOptions(data, fieldOrFilters, currentFilters = {}) {
  // New behavior: if called with (data, filters) return all options with counts
  if (typeof fieldOrFilters === 'object') {
    return getAllAvailableOptions(data, fieldOrFilters);
  }
  
  // Legacy behavior: single field extraction
  const field = fieldOrFilters;
  const filtersWithoutCurrent = { ...currentFilters };
  delete filtersWithoutCurrent[field];
  
  const filtered = filterInventory(data, filtersWithoutCurrent);
  
  const uniqueValues = [...new Set(
    filtered
      .map(item => item[field])
      .filter(val => val !== null && val !== undefined && val !== '')
  )];
  
  return uniqueValues.sort();
}

/**
 * Get all available filter options with counts
 * @param {Array} data - Inventory array  
 * @param {Object} currentFilters - Currently applied filters
 * @returns {Object} - Available options for each filter type with counts
 */
function getAllAvailableOptions(data, currentFilters = {}) {
  if (!data || !Array.isArray(data)) {
    return {};
  }

  // Initialize collections
  const options = {
    usage: new Map(),
    types: new Map(),
    brands: new Map(),
    categories: new Map(),
    styles: new Map(),
    years: new Map(),
    availability: new Map(),
    fuelTypes: new Map(),
    engineTypes: new Map(),
    priceRange: { min: Infinity, max: 0 },
    lengthRange: { min: Infinity, max: 0 },
    beamRange: { min: Infinity, max: 0 },
    horsepowerRange: { min: Infinity, max: 0 }
  };

  // Count occurrences
  data.forEach(item => {
    // Usage
    if (item.usage && item.usage !== "= productDataSource.usageStatus.trim();") {
      options.usage.set(item.usage, (options.usage.get(item.usage) || 0) + 1);
    }
    
    // Types
    if (item.type) {
      options.types.set(item.type, (options.types.get(item.type) || 0) + 1);
    }
    
    // Brands (combine brand and make)
    if (item.brand) {
      options.brands.set(item.brand, (options.brands.get(item.brand) || 0) + 1);
    } else if (item.make) {
      options.brands.set(item.make, (options.brands.get(item.make) || 0) + 1);
    }
    
    // Categories
    if (item.category) {
      options.categories.set(item.category, (options.categories.get(item.category) || 0) + 1);
    }
    
    // Styles
    if (item.style) {
      options.styles.set(item.style, (options.styles.get(item.style) || 0) + 1);
    }
    
    // Years
    if (item.year) {
      options.years.set(item.year, (options.years.get(item.year) || 0) + 1);
    }
    
    // Availability
    if (item.availability) {
      options.availability.set(item.availability, (options.availability.get(item.availability) || 0) + 1);
    }
    
    // Fuel Types
    if (item.fuelType) {
      options.fuelTypes.set(item.fuelType, (options.fuelTypes.get(item.fuelType) || 0) + 1);
    }
    
    // Engine Types
    if (item.engineType) {
      options.engineTypes.set(item.engineType, (options.engineTypes.get(item.engineType) || 0) + 1);
    }
    
    // Numeric ranges
    if (item.price && !isNaN(item.price)) {
      options.priceRange.min = Math.min(options.priceRange.min, item.price);
      options.priceRange.max = Math.max(options.priceRange.max, item.price);
    }
    
    if (item.length && !isNaN(item.length)) {
      options.lengthRange.min = Math.min(options.lengthRange.min, item.length);
      options.lengthRange.max = Math.max(options.lengthRange.max, item.length);
    }
    
    if (item.beam && !isNaN(item.beam)) {
      options.beamRange.min = Math.min(options.beamRange.min, item.beam);
      options.beamRange.max = Math.max(options.beamRange.max, item.beam);
    }
    
    if (item.horsepower && !isNaN(item.horsepower)) {
      options.horsepowerRange.min = Math.min(options.horsepowerRange.min, item.horsepower);
      options.horsepowerRange.max = Math.max(options.horsepowerRange.max, item.horsepower);
    }
  });

  // Convert Maps to arrays and objects
  const mapToArray = (map) => Array.from(map.keys()).sort();
  const mapToCountObject = (map) => Object.fromEntries(map);

  return {
    // Arrays of options
    usage: mapToArray(options.usage),
    types: mapToArray(options.types),
    brands: mapToArray(options.brands),
    categories: mapToArray(options.categories),
    styles: mapToArray(options.styles),
    years: Array.from(options.years.keys()).sort((a, b) => b - a),
    availability: mapToArray(options.availability),
    fuelTypes: mapToArray(options.fuelTypes),
    engineTypes: mapToArray(options.engineTypes),
    
    // Count objects
    usageCounts: mapToCountObject(options.usage),
    typeCounts: mapToCountObject(options.types),
    brandCounts: mapToCountObject(options.brands),
    categoryCounts: mapToCountObject(options.categories),
    styleCounts: mapToCountObject(options.styles),
    yearCounts: mapToCountObject(options.years),
    availabilityCounts: mapToCountObject(options.availability),
    fuelTypeCounts: mapToCountObject(options.fuelTypes),
    engineTypeCounts: mapToCountObject(options.engineTypes),
    
    // Ranges
    priceRange: options.priceRange.min === Infinity ? null : options.priceRange,
    lengthRange: options.lengthRange.min === Infinity ? null : options.lengthRange,
    beamRange: options.beamRange.min === Infinity ? null : options.beamRange,
    horsepowerRange: options.horsepowerRange.min === Infinity ? null : options.horsepowerRange
  };
}

/**
 * Sort inventory by specified criteria
 * @param {Array} data - Inventory array
 * @param {String} sortBy - Sort field (price, year, length, title)
 * @param {String} sortOrder - 'asc' or 'desc'
 * @returns {Array} - Sorted array
 */
export function sortInventory(data, sortBy = 'year', sortOrder = 'desc') {
  if (!data || !Array.isArray(data)) {
    return [];
  }

  const sorted = [...data].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];

    // Handle null/undefined values
    if (aVal === null || aVal === undefined) return 1;
    if (bVal === null || bVal === undefined) return -1;

    // String comparison (for title, brand, etc.)
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
      return sortOrder === 'asc' 
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    // Number comparison (for price, year, length, etc.)
    return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
  });

  return sorted;
}

/**
 * Get min and max values for range filters
 * @param {Array} data - Inventory array
 * @param {String} field - Field name (price, year, length, beam)
 * @returns {Object} - { min, max }
 */
export function getRangeMinMax(data, field) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return { min: 0, max: 0 };
  }

  const values = data
    .map(item => item[field])
    .filter(val => val !== null && val !== undefined && val > 0);

  if (values.length === 0) {
    return { min: 0, max: 0 };
  }

  return {
    min: Math.min(...values),
    max: Math.max(...values)
  };
}


