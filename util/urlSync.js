/**
 * URL Sync Utility
 * Converts between filter objects and URL query strings
 * Keeps filters in sync with browser URL
 */

/**
 * Convert filters object to URL query string
 * @param {Object} filters - Filters object
 * @returns {String} - Query string (without leading ?)
 */
export function filtersToQueryString(filters = {}) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    // Skip empty, null, undefined values
    if (value === null || value === undefined || value === '') {
      return;
    }

    // Skip empty arrays
    if (Array.isArray(value) && value.length === 0) {
      return;
    }

    // Skip "All" placeholder values
    if (typeof value === 'string' && value.startsWith('All ')) {
      return;
    }

    // Handle arrays (multi-select filters)
    if (Array.isArray(value)) {
      value.forEach(v => params.append(key, v));
    } else {
      // Add single value to params
      params.append(key, value);
    }
  });

  const queryString = params.toString();
  return queryString;
}

/**
 * Convert URL query string to filters object
 * @param {URLSearchParams} searchParams - Next.js useSearchParams() result
 * @returns {Object} - Filters object
 */
export function queryStringToFilters(searchParams) {
  const filters = {};

  if (!searchParams) {
    return filters;
  }

  // Keys that should be treated as arrays (multi-select filters)
  const arrayKeys = ['types', 'usage', 'brands', 'categories', 'years', 'availability', 'fuelTypes', 'engineTypes'];

  // Convert URLSearchParams to plain object
  for (const [key, value] of searchParams.entries()) {
    // Check if this key should be an array
    if (arrayKeys.includes(key)) {
      // If key already exists, add to array
      if (filters[key]) {
        if (!Array.isArray(filters[key])) {
          filters[key] = [filters[key]];
        }
        filters[key].push(value);
      } else {
        // First value for this key
        filters[key] = [value];
      }
    } else if (['minPrice', 'maxPrice', 'minYear', 'maxYear', 'minLength', 'maxLength', 'minBeam', 'maxBeam', 'horsepower', 'priceMin', 'priceMax', 'yearMin', 'yearMax', 'lengthMin', 'lengthMax', 'beamMin', 'beamMax', 'horsepowerMin', 'horsepowerMax'].includes(key)) {
      // Convert numeric strings to numbers for range filters
      filters[key] = parseInt(value, 10);
    } else {
      filters[key] = value;
    }
  }

  return filters;
}

/**
 * Build URL for inventory page with filters
 * @param {String} basePath - Base path (e.g., '/inventory')
 * @param {Object} filters - Filters to apply
 * @returns {String} - Full URL path with query string
 */
export function buildInventoryUrl(basePath = '/inventory', filters = {}) {
  const queryString = filtersToQueryString(filters);
  
  if (queryString) {
    return `${basePath}?${queryString}`;
  }
  
  return basePath;
}

/**
 * Update URL without page reload (for client-side filtering)
 * @param {Object} router - Next.js router object
 * @param {String} pathname - Current pathname
 * @param {Object} filters - New filters
 */
export function updateUrlWithFilters(router, pathname, filters) {
  const queryString = filtersToQueryString(filters);
  
  const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
  
  // Use router.replace to update URL without adding to history
  router.replace(newUrl, undefined, { shallow: true });
}

/**
 * Reset filters (clear all query params)
 * @param {Object} router - Next.js router object
 * @param {String} pathname - Current pathname
 */
export function resetFilters(router, pathname) {
  router.replace(pathname, undefined, { shallow: true });
}

/**
 * Parse filter values from route parameters (for category pages)
 * @param {Object} params - Route params from Next.js
 * @param {String} filterType - Type of filter (brand, type, usage)
 * @returns {Object} - Filters object
 */
export function parseRouteFilters(params, filterType) {
  const filters = {};

  if (filterType === 'brand' && params.brand) {
    filters.make = decodeURIComponent(params.brand);
  } else if (filterType === 'type' && params.type) {
    filters.type = decodeURIComponent(params.type);
  } else if (filterType === 'usage' && params.usage) {
    filters.usage = decodeURIComponent(params.usage);
  }

  return filters;
}

/**
 * Validate filter values against allowed options
 * Prevents invalid filter values from URL manipulation
 * @param {Object} filters - Filters to validate
 * @param {Object} filterOptions - Valid filter options from filterOptions.json
 * @returns {Object} - Validated filters
 */
export function validateFilters(filters, filterOptions) {
  const validated = {};

  Object.entries(filters).forEach(([key, value]) => {
    // Range filters - validate min/max
    if (key.startsWith('min') || key.startsWith('max')) {
      if (typeof value === 'number' && !isNaN(value)) {
        validated[key] = value;
      }
      return;
    }

    // Select filters - validate against allowed options
    switch (key) {
      case 'usage':
        if (filterOptions.usage?.includes(value)) {
          validated[key] = value;
        }
        break;
      case 'type':
        if (filterOptions.types?.includes(value)) {
          validated[key] = value;
        }
        break;
      case 'make':
        if (filterOptions.makes?.includes(value)) {
          validated[key] = value;
        }
        break;
      case 'style':
        if (filterOptions.styles?.includes(value)) {
          validated[key] = value;
        }
        break;
      case 'horsepower':
        if (filterOptions.horsepower?.includes(parseInt(value))) {
          validated[key] = parseInt(value);
        }
        break;
      default:
        // Allow other filters through
        validated[key] = value;
    }
  });

  return validated;
}


