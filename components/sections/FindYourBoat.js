'use client'
import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import FilterDropdown from "../inventory/FilterDropdown"
import filterOptions from '@/data/filterOptions.json'
import inventory from '@/data/inventory.json'
import { getFilteredCount } from '@/util/filterEngine'
import { buildInventoryUrl } from '@/util/urlSync'
import LiquidEther from '../effects/LiquidEther'

export default function FindYourBoat() {
    const router = useRouter();
    const [filters, setFilters] = useState({
        usage: '',
        year: '',
        type: '',
        make: '',
        style: ''
    });
    const [resultCount, setResultCount] = useState(inventory.length);

    // Get available options based on current filters
    const getAvailableOptions = (field, currentFilters) => {
        // Filter inventory based on all filters EXCEPT the current field
        const filtersToApply = { ...currentFilters };
        delete filtersToApply[field];

        let filteredInventory = inventory.filter(item => {
            return Object.entries(filtersToApply).every(([key, value]) => {
                if (!value || value === '') return true;
                
                // Handle different field names - map filter names to inventory field names
                const itemValue = key === 'make' ? item.brand :
                                 key === 'year' ? (item.year ? String(item.year) : null) :
                                 item[key]; // 'usage', 'type', 'style' match directly
                
                if (!itemValue) return false;
                return String(itemValue).toLowerCase() === String(value).toLowerCase();
            });
        });

        // Extract unique values for the field
        const values = new Set();
        filteredInventory.forEach(item => {
            let value;
            // Map filter field names to inventory field names
            if (field === 'make') value = item.brand;
            else value = item[field]; // 'usage', 'year', 'type', 'style' match directly
            
            if (value && value !== '' && value !== null && value !== undefined) {
                values.add(value);
            }
        });

        const sortedValues = Array.from(values);
        // Sort years numerically, everything else alphabetically
        if (field === 'year') {
            return sortedValues.sort((a, b) => Number(b) - Number(a)); // Newest first
        }
        return sortedValues.sort();
    };

    // Use static years from filterOptions like the other dropdowns (same as usage dropdown)
    // Convert numbers to strings like other dropdowns
    const availableYears = (filterOptions.years || []).map(year => String(year));
    
    // Dynamically calculate available options for other fields
    const availableTypes = useMemo(() => getAvailableOptions('type', filters), [filters.usage, filters.year, filters.make, filters.style]);
    const availableMakes = useMemo(() => getAvailableOptions('make', filters), [filters.usage, filters.year, filters.type, filters.style]);
    const availableStyles = useMemo(() => getAvailableOptions('style', filters), [filters.usage, filters.year, filters.type, filters.make]);

    // Update result count when filters change
    useEffect(() => {
        const count = getFilteredCount(inventory, filters);
        setResultCount(count);
    }, [filters]);

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => {
            const newFilters = {
                ...prev,
                [filterName]: value
            };
            
            // Clear dependent filters when a parent filter changes
            if (filterName === 'usage') {
                // Keep all other filters
            } else if (filterName === 'year') {
                // Keep other filters
            } else if (filterName === 'type') {
                // Keep other filters
            }
            
            return newFilters;
        });
    };

    const handleReset = () => {
        setFilters({
            usage: '',
            year: '',
            type: '',
            make: '',
            style: ''
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        
        // Build clean filters object (remove empty values)
        const cleanFilters = {};
        Object.entries(filters).forEach(([key, value]) => {
            if (value && value !== '') {
                cleanFilters[key] = value;
            }
        });

        // Navigate to inventory page with filters
        const url = buildInventoryUrl('/inventory', cleanFilters);
        router.push(url);
    };

    return (
        <>
            <div className="widget-search-car" style={{ 
                position: 'relative',
                padding: '80px 0',
                marginTop: '20px',
                marginBottom: '40px',
                minHeight: '500px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {/* Lake Water Gradient Background - Bottom Layer */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0,
                    background: 'linear-gradient(180deg, #87ceeb 0%, #6fb9d4 30%, #5ba4c7 70%, #4a8fb9 100%)'
                }} />
                
                {/* Liquid Ether Background Effect - Middle Layer */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1
                }}>
                    <LiquidEther
                        colors={['#f0f9ff', '#ffffff']}
                        mouseForce={20}
                        cursorSize={100}
                        resolution={0.5}
                        autoDemo={true}
                        autoSpeed={0.5}
                        autoIntensity={2.2}
                        autoResumeDelay={3000}
                    />
                </div>
                
                {/* Content on top of the effects - Top Layer */}
                <div className="themesflat-container" style={{ position: 'relative', zIndex: 2 }}>
                    <div className="search-form-widget" style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        padding: '40px',
                        borderRadius: '15px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                        backdropFilter: 'blur(10px)'
                    }}>
                        <h3 className="text-center mb-4">Find Your Perfect Boat</h3>
                        
                        <form onSubmit={handleSearch} id="find-your-boat-form">
                            <div className="inner-group" style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                                gap: '15px',
                                alignItems: 'end'
                            }}>
                                {/* Usage Dropdown */}
                                <div className="form-group">
                                    <FilterDropdown
                                        label="Used/New"
                                        name="usage"
                                        options={filterOptions.usage}
                                        value={filters.usage}
                                        onChange={(value) => handleFilterChange('usage', value)}
                                        placeholder="All"
                                    />
                                </div>

                                {/* Year Dropdown */}
                                <div className="form-group">
                                    <FilterDropdown
                                        label="Year"
                                        name="year"
                                        options={availableYears}
                                        value={filters.year}
                                        onChange={(value) => handleFilterChange('year', value)}
                                        placeholder="All"
                                    />
                                </div>

                                {/* Type Dropdown */}
                                <div className="form-group">
                                    <FilterDropdown
                                        label="Type"
                                        name="type"
                                        options={availableTypes}
                                        value={filters.type}
                                        onChange={(value) => handleFilterChange('type', value)}
                                        placeholder="All"
                                    />
                                </div>

                                {/* Make Dropdown */}
                                <div className="form-group">
                                    <FilterDropdown
                                        label="Brand"
                                        name="make"
                                        options={availableMakes}
                                        value={filters.make}
                                        onChange={(value) => handleFilterChange('make', value)}
                                        placeholder="All"
                                    />
                                </div>

                                {/* Style Dropdown */}
                                <div className="form-group">
                                    <FilterDropdown
                                        label="Model"
                                        name="style"
                                        options={availableStyles}
                                        value={filters.style}
                                        onChange={(value) => handleFilterChange('style', value)}
                                        placeholder="All"
                                    />
                                </div>

                                {/* Search Button */}
                                <div className="form-group">
                                    <button 
                                        type="submit" 
                                        className="button-search-listing"
                                        style={{ width: '100%' }}
                                    >
                                        <i className="icon-search-1 me-2" />
                                        View {resultCount}
                                    </button>
                                </div>

                                {/* Reset Button */}
                                <div className="form-group">
                                    <button 
                                        type="button" 
                                        className="button-reset-listing"
                                        onClick={handleReset}
                                        style={{ width: '100%' }}
                                    >
                                        Reset
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}


