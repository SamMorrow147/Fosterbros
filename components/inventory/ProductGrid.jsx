'use client'
import ProductCard from './ProductCard'
import SimpleProductCard from './SimpleProductCard'

export default function ProductGrid({ products, sortBy = 'year', onSortChange }) {
  if (!products || products.length === 0) {
    return (
      <div className="no-results-wrapper">
        <div className="no-results">
          <div className="icon-box-2">
            <i className="icon-search-1" style={{ fontSize: '48px' }} />
          </div>
          <h3>No Results Found</h3>
          <p className="body-2">Try adjusting your filters to find what you're looking for.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="inventory-grid-wrapper">
      {/* Results Header */}
      <div className="results-header flex items-center">
        <div className="results-count">
          <p className="body-2">
            Showing <strong>{products.length}</strong> {products.length === 1 ? 'result' : 'results'}
          </p>
        </div>
        
        {onSortChange && (
          <div className="sort-controls">
            <label className="body-3 text-grey">Sort by:</label>
            <select 
              className="nice-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
            >
              <option value="year-desc">Year (Newest)</option>
              <option value="year-asc">Year (Oldest)</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
              <option value="length-desc">Length (Longest)</option>
              <option value="length-asc">Length (Shortest)</option>
            </select>
          </div>
        )}
      </div>

      {/* Product Grid - Full Width */}
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-12">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}


