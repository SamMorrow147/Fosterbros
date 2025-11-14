'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Layout from "@/components/layout/Layout"
import Breadcrumb from "@/components/layout/Breadcrumb"
import ProductCard from "@/components/inventory/ProductCard"
import inventory from '@/data/inventory.json'
import '@/public/assets/css/product-detail.css'

export default function InventoryDetailPage() {
    const params = useParams()
    const { slug } = params
    
    const [product, setProduct] = useState(null)
    const [relatedProducts, setRelatedProducts] = useState([])
    const [activeImageIndex, setActiveImageIndex] = useState(0)

    useEffect(() => {
        // Find product by slug
        const foundProduct = inventory.find(item => item.slug === slug)
        setProduct(foundProduct)

        // Find related products (same type or make)
        if (foundProduct) {
            const related = inventory
                .filter(item => 
                    item.id !== foundProduct.id && 
                    (item.type === foundProduct.type || item.make === foundProduct.make)
                )
                .slice(0, 3)
            setRelatedProducts(related)
        }
    }, [slug])

    if (!product) {
        return (
            <Layout headerStyle={3} footerStyle={1}>
                <div className="themesflat-container">
                    <div className="not-found">
                        <h2>Product Not Found</h2>
                        <p>The product you're looking for doesn't exist.</p>
                        <Link href="/inventory" className="tf-btn">
                            Browse Inventory
                        </Link>
                    </div>
                </div>
            </Layout>
        )
    }

    const images = product.imagesFull || []

    return (
        <Layout headerStyle={3} footerStyle={1}>
            <Breadcrumb 
                breadcrumbTitle={product.title}
                breadcrumbSubTitle={`${product.year} ${product.make} ${product.type}`}
            />

            <div className="themesflat-container">
                <div className="row">
                    {/* Left Column - Images */}
                    <div className="col-lg-8 col-md-12">
                        {/* Main Image */}
                        <div className="detail-gallery">
                            <div className="main-image">
                                <Image
                                    src={images[activeImageIndex] || '/assets/images/car-list/car-list1.jpg'}
                                    alt={product.title}
                                    width={800}
                                    height={600}
                                    style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
                                />
                            </div>
                            
                            {/* Thumbnail Gallery */}
                            {images.length > 1 && (
                                <div className="thumbnail-gallery">
                                    {images.map((img, index) => (
                                        <div 
                                            key={index}
                                            className={`thumbnail ${activeImageIndex === index ? 'active' : ''}`}
                                            onClick={() => setActiveImageIndex(index)}
                                        >
                                            <Image
                                                src={img}
                                                alt={`${product.title} - Image ${index + 1}`}
                                                width={150}
                                                height={100}
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Overview Section - Detailed Specs */}
                        <div className="overview-section">
                            <h3>Overview</h3>
                            <div className="overview-grid">
                                {/* Usage / Hours */}
                                <div className="overview-item">
                                    <span className="overview-label">Usage</span>
                                    <span className="overview-value">{product.hours || '0'} Hours</span>
                                </div>
                                
                                {/* Availability */}
                                {product.availability && (
                                    <div className="overview-item">
                                        <span className="overview-label">Availability</span>
                                        <span className="overview-value">{product.availability}</span>
                                    </div>
                                )}
                                
                                {/* Location */}
                                {product.location && (
                                    <div className="overview-item">
                                        <span className="overview-label">Location</span>
                                        <span className="overview-value">{product.location}</span>
                                    </div>
                                )}
                                
                                {/* Primary Color */}
                                {product.specs?.['Primary Color'] && (
                                    <div className="overview-item">
                                        <span className="overview-label">Primary Color</span>
                                        <span className="overview-value">{product.specs['Primary Color']}</span>
                                    </div>
                                )}
                                
                                {/* Trim Color */}
                                {product.specs?.['Trim Color'] && (
                                    <div className="overview-item">
                                        <span className="overview-label">Trim Color</span>
                                        <span className="overview-value">{product.specs['Trim Color']}</span>
                                    </div>
                                )}
                                
                                {/* Stock Number */}
                                {product.stockNumber && (
                                    <div className="overview-item">
                                        <span className="overview-label">Stock #</span>
                                        <span className="overview-value">{product.stockNumber}</span>
                                    </div>
                                )}
                                
                                {/* VIN */}
                                {product.vin && (
                                    <div className="overview-item">
                                        <span className="overview-label">VIN</span>
                                        <span className="overview-value">{product.vin}</span>
                                    </div>
                                )}
                                
                                {/* Condition */}
                                {product.usage && (
                                    <div className="overview-item">
                                        <span className="overview-label">Condition</span>
                                        <span className="overview-value">{product.usage}</span>
                                    </div>
                                )}
                                
                                {/* Number of Axles */}
                                {product.specs?.['# of Axles'] && (
                                    <div className="overview-item">
                                        <span className="overview-label"># of Axles</span>
                                        <span className="overview-value">{product.specs['# of Axles']}</span>
                                    </div>
                                )}
                                
                                {/* Number of Engines */}
                                {product.specs?.['# of Engines'] && (
                                    <div className="overview-item">
                                        <span className="overview-label"># of Engines</span>
                                        <span className="overview-value">{product.specs['# of Engines']}</span>
                                    </div>
                                )}
                                
                                {/* Beam */}
                                {product.beam && (
                                    <div className="overview-item">
                                        <span className="overview-label">Beam</span>
                                        <span className="overview-value">{product.beam}"</span>
                                    </div>
                                )}
                                
                                {/* Engine Make */}
                                {product.specs?.['Engine Make'] && (
                                    <div className="overview-item">
                                        <span className="overview-label">Engine Make</span>
                                        <span className="overview-value">{product.specs['Engine Make']}</span>
                                    </div>
                                )}
                                
                                {/* Engine Model */}
                                {product.specs?.['Engine Model'] && (
                                    <div className="overview-item">
                                        <span className="overview-label">Engine Model</span>
                                        <span className="overview-value">{product.specs['Engine Model']}</span>
                                    </div>
                                )}
                                
                                {/* Engine Type */}
                                {product.engineType && (
                                    <div className="overview-item">
                                        <span className="overview-label">Engine Type</span>
                                        <span className="overview-value">{product.engineType}</span>
                                    </div>
                                )}
                                
                                {/* Engine Year */}
                                {product.specs?.['Engine Year'] && (
                                    <div className="overview-item">
                                        <span className="overview-label">Engine Year</span>
                                        <span className="overview-value">{product.specs['Engine Year']}</span>
                                    </div>
                                )}
                                
                                {/* Fuel Type */}
                                {product.fuelType && (
                                    <div className="overview-item">
                                        <span className="overview-label">Fuel Type</span>
                                        <span className="overview-value">{product.fuelType}</span>
                                    </div>
                                )}
                                
                                {/* Horsepower */}
                                {product.horsepower && (
                                    <div className="overview-item">
                                        <span className="overview-label">Horsepower</span>
                                        <span className="overview-value">{product.horsepower}</span>
                                    </div>
                                )}
                                
                                {/* Hull Type */}
                                {product.specs?.['Hull Type'] && (
                                    <div className="overview-item">
                                        <span className="overview-label">Hull Type</span>
                                        <span className="overview-value">{product.specs['Hull Type']}</span>
                                    </div>
                                )}
                                
                                {/* Trailer Type */}
                                {product.specs?.['Trailer Type'] && (
                                    <div className="overview-item">
                                        <span className="overview-label">Trailer Type</span>
                                        <span className="overview-value">{product.specs['Trailer Type']}</span>
                                    </div>
                                )}
                                
                                {/* Dry Weight */}
                                {product.specs?.['Dry Weight'] && (
                                    <div className="overview-item">
                                        <span className="overview-label">Dry Weight</span>
                                        <span className="overview-value">{product.specs['Dry Weight']}</span>
                                    </div>
                                )}
                                
                                {/* Length */}
                                {product.length && (
                                    <div className="overview-item">
                                        <span className="overview-label">Length</span>
                                        <span className="overview-value">{product.length}'</span>
                                    </div>
                                )}
                                
                                {/* Hull Material */}
                                {product.specs?.['Hull Material'] && (
                                    <div className="overview-item">
                                        <span className="overview-label">Hull Material</span>
                                        <span className="overview-value">{product.specs['Hull Material']}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Dealer Notes - Primary Content */}
                        {product.dealerNotes && (
                            <div className="dealer-notes-section">
                                <h3>Dealer Notes</h3>
                                <div className="dealer-notes-content">
                                    {product.dealerNotes.split('\n').map((paragraph, index) => (
                                        <p key={index} className="body-2">{paragraph}</p>
                                    ))}
                                </div>
                            </div>
                        )}


                        {/* Description (fallback if no dealer notes) */}
                        {(!product.dealerNotes || product.dealerNotes.length === 0) && (
                            <div className="detail-description">
                                <h3>Description</h3>
                                <p className="body-2">{product.description}</p>
                            </div>
                        )}

                    </div>

                    {/* Right Column - Price & Contact */}
                    <div className="col-lg-4 col-md-12">
                        <div className="detail-sidebar">
                            {/* Price Card */}
                            <div className="price-card">
                                {product.price ? (
                                    <h2 className="price">${product.price.toLocaleString()}</h2>
                                ) : (
                                    <h2 className="price">Call for Price</h2>
                                )}
                                
                                {/* Badges */}
                                <div className="badges">
                                    {product.usage === 'New' && (
                                        <span className="badge badge-new">New</span>
                                    )}
                                    {product.usage === 'Used' && (
                                        <span className="badge badge-used">Used</span>
                                    )}
                                    {product.usage === 'Excellent' && (
                                        <span className="badge badge-new">Excellent</span>
                                    )}
                                    {product.availability === 'In Stock' && (
                                        <span className="badge badge-available">In Stock</span>
                                    )}
                                </div>

                                {/* Stock Number */}
                                {product.stockNumber && (
                                    <p className="body-3 text-grey">Stock #: {product.stockNumber}</p>
                                )}

                                {/* Location */}
                                {product.location && (
                                    <p className="body-3 text-grey">
                                        <i className="icon-map-pin" /> {product.location}
                                    </p>
                                )}
                                
                                {/* VIN */}
                                {product.vin && (
                                    <p className="body-3 text-grey">VIN: {product.vin}</p>
                                )}
                            </div>

                            {/* Contact CTA */}
                            <div className="contact-cta">
                                <Link href="/contact-us" className="tf-btn btn-primary w-100 mb-3">
                                    <i className="icon-phone" /> Contact Us
                                </Link>
                                <Link href="/contact-us" className="tf-btn btn-outline w-100">
                                    Get Financing
                                </Link>
                            </div>

                            {/* Quick Specs */}
                            <div className="quick-specs">
                                <h4>Quick Specs</h4>
                                <ul>
                                    <li>
                                        <i className="icon-autodrive" />
                                        <span>{product.year} {product.make}</span>
                                    </li>
                                    <li>
                                        <i className="icon-car-2" />
                                        <span>{product.type}</span>
                                    </li>
                                    {product.style && (
                                        <li>
                                            <i className="icon-layers" />
                                            <span>{product.style}</span>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="related-products">
                        <h3>Related Products</h3>
                        <div className="row">
                            {relatedProducts.map((relatedProduct) => (
                                <div key={relatedProduct.id} className="col-lg-4 col-md-6">
                                    <ProductCard product={relatedProduct} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    )
}


