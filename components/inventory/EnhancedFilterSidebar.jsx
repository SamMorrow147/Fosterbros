'use client'
import { useState, useEffect } from 'react'
import { filterInventory, getAvailableOptions } from '@/util/filterEngine'

export default function EnhancedFilterSidebar({ 
  filters = {}, 
  onFilterChange, 
  inventory = [],
  context = {} 
}) {
  const [expandedSections, setExpandedSections] = useState({
    type: false,
    usage: false,
    brand: false,
    class: false,
    modelYear: false,
    inventoryStatus: false,
    beam: false,
    dryWeight: false,
    lengthOverall: false,
    fuelType: false,
    length: false,
    tiltBed: false,
    engineType: false,
    showroom: false,
    numberOfAxles: false,
    hitchType: false,
    industry: false,
    frame: false,
    horsepower: false,
    price: false
  });

  // Get available options based on current filters
  const availableOptions = getAvailableOptions(inventory, filters);

  const toggleSection = (section) => {
    setExpandedSections(prev => {
      // If clicking the currently open section, close it
      if (prev[section]) {
        return { ...prev, [section]: false };
      }
      // Otherwise, close all sections and open only the clicked one
      const allClosed = Object.keys(prev).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});
      return { ...allClosed, [section]: true };
    });
  };

  const handleCheckboxChange = (filterType, value) => {
    const currentValues = filters[filterType] || [];
    let newValues;
    
    if (Array.isArray(currentValues)) {
      if (currentValues.includes(value)) {
        newValues = currentValues.filter(v => v !== value);
      } else {
        newValues = [...currentValues, value];
      }
    } else {
      newValues = currentValues === value ? null : value;
    }
    
    onFilterChange({
      ...filters,
      [filterType]: newValues && newValues.length > 0 ? newValues : null
    });
  };

  const handleRangeChange = (filterType, min, max) => {
    onFilterChange({
      ...filters,
      [`${filterType}Min`]: min || null,
      [`${filterType}Max`]: max || null
    });
  };

  const clearAllFilters = () => {
    onFilterChange({});
  };

  // Helper function to format filter names
  const formatFilterName = (key) => {
    const nameMap = {
      types: 'Type',
      usage: 'Usage',
      brands: 'Brand',
      categories: 'Class',
      years: 'Year',
      availability: 'Status',
      fuelTypes: 'Fuel Type',
      engineTypes: 'Engine Type',
      lengthMin: 'Min Length',
      lengthMax: 'Max Length',
      beamMin: 'Min Beam',
      beamMax: 'Max Beam',
      horsepowerMin: 'Min HP',
      horsepowerMax: 'Max HP',
      priceMin: 'Min Price',
      priceMax: 'Max Price',
    };
    return nameMap[key] || key;
  };

  // Helper function to format filter values
  const formatFilterValue = (key, value) => {
    if (key.includes('price')) {
      return `$${parseInt(value).toLocaleString()}`;
    }
    if (key.includes('length')) {
      return `${value} ft`;
    }
    if (key.includes('beam')) {
      return `${value} in`;
    }
    if (key.includes('horsepower')) {
      return `${value} hp`;
    }
    return value;
  };

  // Convert filters object to array of displayable items
  const getActiveFilterItems = () => {
    const items = [];
    
    Object.keys(filters).forEach(key => {
      const value = filters[key];
      
      // Skip null, undefined, or empty values
      if (value === null || value === undefined || 
          (Array.isArray(value) && value.length === 0)) {
        return;
      }

      // Handle array filters (multiple selections)
      if (Array.isArray(value)) {
        value.forEach(item => {
          items.push({
            key: key,
            value: item,
            displayName: formatFilterName(key),
            displayValue: formatFilterValue(key, item),
            type: 'array'
          });
        });
      } 
      // Handle range filters (min/max values)
      else {
        items.push({
          key: key,
          value: value,
          displayName: formatFilterName(key),
          displayValue: formatFilterValue(key, value),
          type: 'single'
        });
      }
    });

    return items;
  };

  const handleRemoveFilter = (filterKey, filterValue, filterType) => {
    const newFilters = { ...filters };
    
    if (filterType === 'array') {
      // Remove specific value from array
      const currentValues = newFilters[filterKey] || [];
      const updatedValues = currentValues.filter(v => v !== filterValue);
      
      if (updatedValues.length === 0) {
        delete newFilters[filterKey];
      } else {
        newFilters[filterKey] = updatedValues;
      }
    } else {
      // Remove single value or range value
      delete newFilters[filterKey];
    }
    
    onFilterChange(newFilters);
  };

  const activeItems = getActiveFilterItems();

  return (
    <div className="enhanced-filter-sidebar">
      <div className="filter-header">
        <h3>Filters by:</h3>
        {activeItems.length > 0 && (
          <button className="clear-filters" onClick={clearAllFilters}>
            Clear All
          </button>
        )}
      </div>

      {/* Active Filters Display */}
      {activeItems.length > 0 && (
        <div className="active-filters-section">
          <div className="active-filters-tags">
            {activeItems.map((item, index) => {
              const tagId = `${item.key}-${item.value}-${index}`;
              
              return (
                <div key={tagId} className="filter-tag">
                  <span className="filter-tag-label">{item.displayName}:</span>
                  <span className="filter-tag-value">{item.displayValue}</span>
                  <button 
                    className="filter-tag-remove"
                    onClick={() => handleRemoveFilter(item.key, item.value, item.type)}
                    aria-label={`Remove ${item.displayName}: ${item.displayValue}`}
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Type Filter */}
      {!context.hideType && availableOptions.types?.length > 0 && (
        <div className="filter-section">
          <div className="filter-title" onClick={() => toggleSection('type')}>
            <span>Type</span>
            <span className="toggle-icon">{expandedSections.type ? '−' : '+'}</span>
          </div>
          {expandedSections.type && (
            <div className="filter-options">
              {availableOptions.types.map(type => (
                <label key={type} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={filters.types?.includes(type) || false}
                    onChange={() => handleCheckboxChange('types', type)}
                  />
                  <span>{type} ({availableOptions.typeCounts?.[type] || 0})</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Usage Filter */}
      {!context.hideUsage && availableOptions.usage?.length > 0 && (
        <div className="filter-section">
          <div className="filter-title" onClick={() => toggleSection('usage')}>
            <span>Usage</span>
            <span className="toggle-icon">{expandedSections.usage ? '−' : '+'}</span>
          </div>
          {expandedSections.usage && (
            <div className="filter-options">
              {availableOptions.usage.filter(u => u !== "= productDataSource.usageStatus.trim();").map(usage => (
                <label key={usage} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={filters.usage?.includes(usage) || false}
                    onChange={() => handleCheckboxChange('usage', usage)}
                  />
                  <span>{usage} ({availableOptions.usageCounts?.[usage] || 0})</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Brand Filter */}
      {!context.hideBrand && availableOptions.brands?.length > 0 && (
        <div className="filter-section">
          <div className="filter-title" onClick={() => toggleSection('brand')}>
            <span>Brand</span>
            <span className="toggle-icon">{expandedSections.brand ? '−' : '+'}</span>
          </div>
          {expandedSections.brand && (
            <div className="filter-options">
              {availableOptions.brands.map(brand => (
                <label key={brand} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={filters.brands?.includes(brand) || false}
                    onChange={() => handleCheckboxChange('brands', brand)}
                  />
                  <span>{brand} ({availableOptions.brandCounts?.[brand] || 0})</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Class/Category Filter */}
      {availableOptions.categories?.length > 0 && (
        <div className="filter-section">
          <div className="filter-title" onClick={() => toggleSection('class')}>
            <span>Class</span>
            <span className="toggle-icon">{expandedSections.class ? '−' : '+'}</span>
          </div>
          {expandedSections.class && (
            <div className="filter-options">
              {availableOptions.categories.map(cat => (
                <label key={cat} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={filters.categories?.includes(cat) || false}
                    onChange={() => handleCheckboxChange('categories', cat)}
                  />
                  <span>{cat} ({availableOptions.categoryCounts?.[cat] || 0})</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Model Year Filter */}
      {availableOptions.years?.length > 0 && (
        <div className="filter-section">
          <div className="filter-title" onClick={() => toggleSection('modelYear')}>
            <span>Model Year</span>
            <span className="toggle-icon">{expandedSections.modelYear ? '−' : '+'}</span>
          </div>
          {expandedSections.modelYear && (
            <div className="filter-options">
              {availableOptions.years.map(year => (
                <label key={year} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={filters.years?.includes(year) || false}
                    onChange={() => handleCheckboxChange('years', year)}
                  />
                  <span>{year} ({availableOptions.yearCounts?.[year] || 0})</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Inventory Status Filter */}
      {availableOptions.availability?.length > 0 && (
        <div className="filter-section">
          <div className="filter-title" onClick={() => toggleSection('inventoryStatus')}>
            <span>Inventory Status</span>
            <span className="toggle-icon">{expandedSections.inventoryStatus ? '−' : '+'}</span>
          </div>
          {expandedSections.inventoryStatus && (
            <div className="filter-options">
              {availableOptions.availability.map(status => (
                <label key={status} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={filters.availability?.includes(status) || false}
                    onChange={() => handleCheckboxChange('availability', status)}
                  />
                  <span>{status} ({availableOptions.availabilityCounts?.[status] || 0})</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Length Filter */}
      {availableOptions.lengthRange && (
        <div className="filter-section">
          <div className="filter-title" onClick={() => toggleSection('length')}>
            <span>Length</span>
            <span className="toggle-icon">{expandedSections.length ? '−' : '+'}</span>
          </div>
          {expandedSections.length && (
            <div className="filter-options range-filter">
              <div className="range-inputs">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.lengthMin || ''}
                  onChange={(e) => handleRangeChange('length', e.target.value, filters.lengthMax)}
                  className="range-input"
                />
                <span>to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.lengthMax || ''}
                  onChange={(e) => handleRangeChange('length', filters.lengthMin, e.target.value)}
                  className="range-input"
                />
                <span>ft</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Beam Filter */}
      {availableOptions.beamRange && (
        <div className="filter-section">
          <div className="filter-title" onClick={() => toggleSection('beam')}>
            <span>Beam</span>
            <span className="toggle-icon">{expandedSections.beam ? '−' : '+'}</span>
          </div>
          {expandedSections.beam && (
            <div className="filter-options range-filter">
              <div className="range-inputs">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.beamMin || ''}
                  onChange={(e) => handleRangeChange('beam', e.target.value, filters.beamMax)}
                  className="range-input"
                />
                <span>to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.beamMax || ''}
                  onChange={(e) => handleRangeChange('beam', filters.beamMin, e.target.value)}
                  className="range-input"
                />
                <span>in</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Fuel Type Filter */}
      {availableOptions.fuelTypes?.length > 0 && (
        <div className="filter-section">
          <div className="filter-title" onClick={() => toggleSection('fuelType')}>
            <span>Fuel Type</span>
            <span className="toggle-icon">{expandedSections.fuelType ? '−' : '+'}</span>
          </div>
          {expandedSections.fuelType && (
            <div className="filter-options">
              {availableOptions.fuelTypes.map(fuel => (
                <label key={fuel} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={filters.fuelTypes?.includes(fuel) || false}
                    onChange={() => handleCheckboxChange('fuelTypes', fuel)}
                  />
                  <span>{fuel} ({availableOptions.fuelTypeCounts?.[fuel] || 0})</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Engine Type Filter */}
      {availableOptions.engineTypes?.length > 0 && (
        <div className="filter-section">
          <div className="filter-title" onClick={() => toggleSection('engineType')}>
            <span>Engine Type</span>
            <span className="toggle-icon">{expandedSections.engineType ? '−' : '+'}</span>
          </div>
          {expandedSections.engineType && (
            <div className="filter-options">
              {availableOptions.engineTypes.map(engine => (
                <label key={engine} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={filters.engineTypes?.includes(engine) || false}
                    onChange={() => handleCheckboxChange('engineTypes', engine)}
                  />
                  <span>{engine} ({availableOptions.engineTypeCounts?.[engine] || 0})</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Horsepower Filter */}
      {availableOptions.horsepowerRange && (
        <div className="filter-section">
          <div className="filter-title" onClick={() => toggleSection('horsepower')}>
            <span>Horsepower</span>
            <span className="toggle-icon">{expandedSections.horsepower ? '−' : '+'}</span>
          </div>
          {expandedSections.horsepower && (
            <div className="filter-options range-filter">
              <div className="range-inputs">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.horsepowerMin || ''}
                  onChange={(e) => handleRangeChange('horsepower', e.target.value, filters.horsepowerMax)}
                  className="range-input"
                />
                <span>to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.horsepowerMax || ''}
                  onChange={(e) => handleRangeChange('horsepower', filters.horsepowerMin, e.target.value)}
                  className="range-input"
                />
                <span>hp</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Price Filter */}
      {availableOptions.priceRange && (
        <div className="filter-section">
          <div className="filter-title" onClick={() => toggleSection('price')}>
            <span>Price</span>
            <span className="toggle-icon">{expandedSections.price ? '−' : '+'}</span>
          </div>
          {expandedSections.price && (
            <div className="filter-options range-filter">
              <div className="range-inputs">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceMin || ''}
                  onChange={(e) => handleRangeChange('price', e.target.value, filters.priceMax)}
                  className="range-input"
                />
                <span>to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceMax || ''}
                  onChange={(e) => handleRangeChange('price', filters.priceMin, e.target.value)}
                  className="range-input"
                />
              </div>
              <div className="price-presets">
                <button onClick={() => handleRangeChange('price', 0, 10000)}>Under $10k</button>
                <button onClick={() => handleRangeChange('price', 10000, 25000)}>$10k-$25k</button>
                <button onClick={() => handleRangeChange('price', 25000, 50000)}>$25k-$50k</button>
                <button onClick={() => handleRangeChange('price', 50000, 100000)}>$50k-$100k</button>
                <button onClick={() => handleRangeChange('price', 100000, null)}>Over $100k</button>
              </div>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .enhanced-filter-sidebar {
          background: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 0;
          margin-bottom: 20px;
        }

        .filter-header {
          padding: 20px;
          border-bottom: 1px solid #e0e0e0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .filter-header h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
        }

        .clear-filters {
          background: #dc3545;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          transition: background 0.2s;
        }

        .clear-filters:hover {
          background: #c82333;
        }

        .active-filters-section {
          padding: 15px 20px;
          background: #f8f9fa;
          border-bottom: 1px solid #e0e0e0;
        }

        .active-filters-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .filter-tag {
          display: inline-flex;
          align-items: center;
          background: white;
          border: 1px solid #007bff;
          border-radius: 20px;
          padding: 6px 12px;
          font-size: 13px;
          gap: 6px;
          transition: all 0.2s;
        }

        .filter-tag:hover {
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .filter-tag-label {
          color: #666;
          font-weight: 500;
        }

        .filter-tag-value {
          color: #007bff;
          font-weight: 600;
        }

        .filter-tag-remove {
          background: none;
          border: none;
          color: #dc3545;
          font-size: 18px;
          line-height: 1;
          cursor: pointer;
          padding: 0;
          margin-left: 4px;
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.2s;
        }

        .filter-tag-remove:hover {
          background: #dc3545;
          color: white;
        }

        .filter-section {
          border-bottom: 1px solid #e0e0e0;
        }

        .filter-section:last-child {
          border-bottom: none;
        }

        .filter-title {
          padding: 15px 20px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 500;
          transition: background 0.2s;
        }

        .filter-title:hover {
          background: #f8f9fa;
        }

        .toggle-icon {
          font-size: 20px;
          color: #666;
        }

        .filter-options {
          padding: 10px 20px 15px;
        }

        .filter-checkbox {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          cursor: pointer;
        }

        .filter-checkbox input {
          margin-right: 10px;
          cursor: pointer;
        }

        .filter-checkbox span {
          flex-grow: 1;
        }

        .filter-checkbox .count {
          color: #666;
          font-size: 14px;
          margin-left: 5px;
        }

        .range-filter {
          padding: 15px 20px;
        }

        .range-inputs {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .range-input {
          width: 80px;
          padding: 6px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .price-presets {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-top: 10px;
        }

        .price-presets button {
          padding: 4px 8px;
          font-size: 12px;
          background: #f0f0f0;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
        }

        .price-presets button:hover {
          background: #e0e0e0;
        }
      `}</style>
    </div>
  );
}
