'use client'
import { useState, useEffect } from 'react'
import { useParams, useSearchParams, useRouter, usePathname } from 'next/navigation'
import Layout from "@/components/layout/Layout"
import FilterSidebar from "@/components/inventory/FilterSidebar"
import ProductGrid from "@/components/inventory/ProductGrid"
import Breadcrumb from "@/components/layout/Breadcrumb"
import inventory from '@/data/inventory.json'
import { filterInventory, sortInventory } from '@/util/filterEngine'
import { queryStringToFilters, updateUrlWithFilters } from '@/util/urlSync'
import { mergeFilters } from '@/util/filterContext'

export default function TypePage() {
    const params = useParams()
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    
    const typeName = decodeURIComponent(params.type)
    const lockedFilters = { type: typeName }
    
    const [filters, setFilters] = useState({})
    const [filteredProducts, setFilteredProducts] = useState([])
    const [sortBy, setSortBy] = useState('year-desc')

    useEffect(() => {
        const urlFilters = queryStringToFilters(searchParams)
        setFilters(urlFilters)
    }, [searchParams])

    useEffect(() => {
        const combinedFilters = mergeFilters(lockedFilters, filters)
        let results = filterInventory(inventory, combinedFilters)
        
        const [field, order] = sortBy.split('-')
        results = sortInventory(results, field, order)
        
        setFilteredProducts(results)
    }, [filters, sortBy, typeName])

    const handleFilterChange = (newFilters) => {
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
                breadcrumbTitle={`${typeName} For Sale`}
                breadcrumbSubTitle={`Browse all ${typeName}`}
            />
            
            <div className="themesflat-container full">
                <div className="row">
                    <div className="col-lg-3 col-md-12">
                        <FilterSidebar
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            onReset={handleReset}
                            lockedFilters={lockedFilters}
                            resultCount={filteredProducts.length}
                        />
                    </div>

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


