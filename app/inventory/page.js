'use client'
import { useState, useEffect } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import Layout from "@/components/layout/Layout"
import EnhancedFilterSidebar from "@/components/inventory/EnhancedFilterSidebar"
import ProductGrid from "@/components/inventory/ProductGrid"
import Breadcrumb from "@/components/layout/Breadcrumb"
import inventory from '@/data/inventory.json'
import { filterInventory, sortInventory } from '@/util/filterEngine'
import { queryStringToFilters, updateUrlWithFilters } from '@/util/urlSync'

export default function InventoryPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    
    const [filters, setFilters] = useState({})
    const [filteredProducts, setFilteredProducts] = useState(inventory)
    const [sortBy, setSortBy] = useState('year-desc')

    // Initialize filters from URL on mount
    useEffect(() => {
        const urlFilters = queryStringToFilters(searchParams)
        setFilters(urlFilters)
    }, [searchParams])

    // Apply filters and sorting whenever filters or sortBy changes
    useEffect(() => {
        console.log('Current filters:', filters);
        let results = filterInventory(inventory, filters)
        console.log('Filtered results count:', results.length);
        
        // Apply sorting
        const [field, order] = sortBy.split('-')
        results = sortInventory(results, field, order)
        
        setFilteredProducts(results)
    }, [filters, sortBy])

    const handleFilterChange = (newFilters) => {
        console.log('Filter change:', newFilters);
        setFilters(newFilters)
        updateUrlWithFilters(router, pathname, newFilters)
    }

    const handleReset = () => {
        setFilters({})
        router.replace(pathname, undefined, { shallow: true })
    }

    const handleSortChange = (newSortBy) => {
        setSortBy(newSortBy)
    }

    return (
        <Layout headerStyle={3} footerStyle={1}>
            <Breadcrumb 
                breadcrumbTitle="Browse Inventory" 
                breadcrumbSubTitle="Find your perfect boat, pontoon, motor or trailer" 
            />
            
            <div className="themesflat-container full">
                <div className="row">
                    {/* Sidebar Filters */}
                    <div className="col-lg-3 col-md-12">
                        <EnhancedFilterSidebar
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            inventory={inventory}
                            context={{}}
                        />
                    </div>

                    {/* Product Grid */}
                    <div className="col-lg-9 col-md-12">
                        <ProductGrid
                            products={filteredProducts}
                            sortBy={sortBy}
                            onSortChange={handleSortChange}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    )
}


