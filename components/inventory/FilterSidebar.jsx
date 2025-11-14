'use client'
import { useState, useEffect } from 'react'
import FilterDropdown from './FilterDropdown'
import RangeSlider from '../elements/RangeSlider'
import filterOptions from '@/data/filterOptions.json'
import { getVisibleFilters, getFilterConfig } from '@/util/filterContext'

export default function FilterSidebar({ 
  filters = {}, 
  onFilterChange, 
  onReset,
  lockedFilters = {},
  resultCount = 0
}) {
  const [localFilters, setLocalFilters] = useState(filters);

  // Get which filters should be visible based on context
  const visibleFilters = getVisibleFilters({ lockedFilters });

  // Update local state when parent filters change
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (filterName, value) => {
    const newFilters = {
      ...localFilters,
      [filterName]: value
    };
    setLocalFilters(newFilters);
    
    // Call parent handler
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handleRangeChange = (filterName, values) => {
    const newFilters = {
      ...localFilters,
      [`min${filterName.charAt(0).toUpperCase() + filterName.slice(1)}`]: values[0],
      [`max${filterName.charAt(0).toUpperCase() + filterName.slice(1)}`]: values[1]
    };
    setLocalFilters(newFilters);
    
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handleResetClick = () => {
    setLocalFilters({});
    if (onReset) {
      onReset();
    }
  };

  return (
    <div className="widget-sidebar-car-list">
      <div className="widget-filter">
        <div className="group-form form-search-content">
          {/* Header */}
          <div className="widget-heading flex items-center justify-between">
            <h5>Filter Results</h5>
            <button 
              className="tf-btn-reset" 
              onClick={handleResetClick}
            >
              Reset
            </button>
          </div>

          {/* Usage Filter */}
          {visibleFilters.includes('usage') && (
            <FilterDropdown
              label="Condition"
              name="usage"
              options={filterOptions.usage}
              value={localFilters.usage}
              onChange={(value) => handleFilterChange('usage', value)}
              placeholder="All Usage"
            />
          )}

          {/* Type Filter */}
          {visibleFilters.includes('type') && (
            <FilterDropdown
              label="Type"
              name="type"
              options={filterOptions.types}
              value={localFilters.type}
              onChange={(value) => handleFilterChange('type', value)}
              placeholder="All Types"
            />
          )}

          {/* Make Filter */}
          {visibleFilters.includes('make') && (
            <FilterDropdown
              label="Make"
              name="make"
              options={filterOptions.makes}
              value={localFilters.make}
              onChange={(value) => handleFilterChange('make', value)}
              placeholder="All Makes"
            />
          )}

          {/* Style Filter */}
          {visibleFilters.includes('style') && (
            <FilterDropdown
              label="Style"
              name="style"
              options={filterOptions.styles}
              value={localFilters.style}
              onChange={(value) => handleFilterChange('style', value)}
              placeholder="All Styles"
            />
          )}

          {/* Year Range Filter */}
          {visibleFilters.includes('year') && (
            <div className="form-group">
              <label className="body-2">Year</label>
              <div className="widget widget-price">
                <RangeSlider
                  min={Math.min(...filterOptions.years)}
                  max={Math.max(...filterOptions.years)}
                  values={[
                    localFilters.minYear || Math.min(...filterOptions.years),
                    localFilters.maxYear || Math.max(...filterOptions.years)
                  ]}
                  onChange={(values) => handleRangeChange('year', values)}
                />
              </div>
            </div>
          )}

          {/* Price Range Filter */}
          {visibleFilters.includes('price') && (
            <div className="form-group">
              <label className="body-2">Price</label>
              <div className="widget widget-price">
                <RangeSlider
                  min={filterOptions.priceRange.min}
                  max={filterOptions.priceRange.max}
                  step={filterOptions.priceRange.step}
                  values={[
                    localFilters.minPrice || filterOptions.priceRange.min,
                    localFilters.maxPrice || filterOptions.priceRange.max
                  ]}
                  onChange={(values) => handleRangeChange('price', values)}
                  format="currency"
                />
              </div>
            </div>
          )}

          {/* Length Range Filter */}
          {visibleFilters.includes('length') && (
            <div className="form-group">
              <label className="body-2">Length (ft)</label>
              <div className="widget widget-price">
                <RangeSlider
                  min={filterOptions.lengthRange.min}
                  max={filterOptions.lengthRange.max}
                  step={filterOptions.lengthRange.step}
                  values={[
                    localFilters.minLength || filterOptions.lengthRange.min,
                    localFilters.maxLength || filterOptions.lengthRange.max
                  ]}
                  onChange={(values) => handleRangeChange('length', values)}
                />
              </div>
            </div>
          )}

          {/* Horsepower Filter */}
          {visibleFilters.includes('horsepower') && (
            <FilterDropdown
              label="Horsepower"
              name="horsepower"
              options={filterOptions.horsepower.map(hp => ({ value: hp, label: `${hp} HP` }))}
              value={localFilters.horsepower}
              onChange={(value) => handleFilterChange('horsepower', value)}
              placeholder="Any HP"
            />
          )}

          {/* Results Count */}
          <div className="result-count">
            <p className="body-2 text-color-3">
              <strong>{resultCount}</strong> {resultCount === 1 ? 'result' : 'results'} found
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


