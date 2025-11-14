/**
 * Filter Context Manager
 * Determines which filters to show based on page context
 * (e.g., on brand pages, hide the Make filter)
 */

/**
 * Get list of filters that should be visible based on context
 * @param {Object} context - Page context { lockedFilters: { make: 'Yamaha' } }
 * @returns {Array} - Array of filter names to display
 */
export function getVisibleFilters(context = {}) {
  const allFilters = [
    'usage',
    'year',
    'type',
    'make',
    'style',
    'price',
    'length',
    'beam',
    'horsepower',
    'fuelType',
    'engineType'
  ];

  const lockedFilters = context.lockedFilters || {};
  
  // Hide any filters that are locked (pre-filtered)
  return allFilters.filter(filter => !(filter in lockedFilters));
}

/**
 * Determine which filters should be locked based on route
 * @param {String} pathname - Current route path
 * @param {Object} params - Route parameters
 * @returns {Object} - Locked filters object
 */
export function getLockedFilters(pathname, params = {}) {
  const locked = {};

  // Brand pages: /inventory/brand/[brand]
  if (pathname.includes('/inventory/brand/') && params.brand) {
    locked.make = decodeURIComponent(params.brand);
  }

  // Type pages: /inventory/type/[type]
  if (pathname.includes('/inventory/type/') && params.type) {
    locked.type = decodeURIComponent(params.type);
  }

  // Usage pages: /inventory/usage/[usage]
  if (pathname.includes('/inventory/usage/') && params.usage) {
    locked.usage = decodeURIComponent(params.usage);
  }

  return locked;
}

/**
 * Get filter configuration for a specific filter
 * Returns metadata about how to render the filter
 * @param {String} filterName - Name of the filter
 * @returns {Object} - Filter configuration
 */
export function getFilterConfig(filterName) {
  const configs = {
    usage: {
      label: 'Condition',
      type: 'select',
      placeholder: 'All Usage',
      field: 'usage'
    },
    year: {
      label: 'Year',
      type: 'range',
      placeholder: 'All Years',
      field: 'year'
    },
    type: {
      label: 'Type',
      type: 'select',
      placeholder: 'All Types',
      field: 'type'
    },
    make: {
      label: 'Make',
      type: 'select',
      placeholder: 'All Makes',
      field: 'make'
    },
    style: {
      label: 'Style',
      type: 'select',
      placeholder: 'All Styles',
      field: 'style'
    },
    price: {
      label: 'Price',
      type: 'range',
      placeholder: 'Any Price',
      field: 'price'
    },
    length: {
      label: 'Length (ft)',
      type: 'range',
      placeholder: 'Any Length',
      field: 'length'
    },
    beam: {
      label: 'Beam (in)',
      type: 'range',
      placeholder: 'Any Beam',
      field: 'beam'
    },
    horsepower: {
      label: 'Horsepower',
      type: 'select',
      placeholder: 'Any HP',
      field: 'horsepower'
    },
    fuelType: {
      label: 'Fuel Type',
      type: 'select',
      placeholder: 'All Fuel Types',
      field: 'fuelType'
    },
    engineType: {
      label: 'Engine Type',
      type: 'select',
      placeholder: 'All Engine Types',
      field: 'engineType'
    }
  };

  return configs[filterName] || { label: filterName, type: 'select' };
}

/**
 * Merge locked filters with user-selected filters
 * Locked filters always take precedence
 * @param {Object} lockedFilters - Filters locked by route
 * @param {Object} userFilters - Filters selected by user
 * @returns {Object} - Combined filters
 */
export function mergeFilters(lockedFilters = {}, userFilters = {}) {
  return {
    ...userFilters,
    ...lockedFilters
  };
}

/**
 * Get page title based on context
 * @param {Object} lockedFilters - Current locked filters
 * @returns {String} - Page title
 */
export function getPageTitle(lockedFilters = {}) {
  if (lockedFilters.make) {
    return `${lockedFilters.make} Inventory`;
  }
  if (lockedFilters.type) {
    return `${lockedFilters.type} For Sale`;
  }
  if (lockedFilters.usage) {
    return `${lockedFilters.usage} Inventory`;
  }
  return 'Browse Inventory';
}

/**
 * Get breadcrumb items based on context
 * @param {Object} lockedFilters - Current locked filters
 * @returns {Array} - Breadcrumb items
 */
export function getBreadcrumbs(lockedFilters = {}) {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Inventory', href: '/inventory' }
  ];

  if (lockedFilters.type) {
    breadcrumbs.push({ 
      label: lockedFilters.type, 
      href: `/inventory/type/${encodeURIComponent(lockedFilters.type)}` 
    });
  }

  if (lockedFilters.make) {
    breadcrumbs.push({ 
      label: lockedFilters.make, 
      href: `/inventory/brand/${encodeURIComponent(lockedFilters.make)}` 
    });
  }

  if (lockedFilters.usage) {
    breadcrumbs.push({ 
      label: lockedFilters.usage, 
      href: `/inventory/usage/${encodeURIComponent(lockedFilters.usage)}` 
    });
  }

  return breadcrumbs;
}


