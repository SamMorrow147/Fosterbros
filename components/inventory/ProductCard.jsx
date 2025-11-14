'use client'
import Link from "next/link"

export default function ProductCard({ product }) {
  if (!product) return null;

  const {
    slug,
    title,
    price,
    year,
    type,
    usage,
    availability,
    imagesFull,
    imagesThumb,
    length,
    horsepower,
    make
  } = product;

  // Use thumb image if available, otherwise use first full image
  const imageUrl = (imagesThumb && imagesThumb[0]) || (imagesFull && imagesFull[0]) || null;

  // Badge display
  const getBadge = () => {
    if (availability === 'Sold') return { text: 'SOLD', class: 'sold' };
    if (usage === 'New') return { text: 'Sale', class: 'sale' };
    return null;
  };
  const badge = getBadge();

  return (
    <div className="tf-car-service horizontal-card" style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', gap: '20px', background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        {/* Image Section */}
        <div style={{ position: 'relative', width: '450px', minWidth: '450px' }}>
          {badge && (
            <div className={`listing-badge ${badge.class}`} style={{
              position: 'absolute',
              top: '15px',
              left: '15px',
              zIndex: 10,
              padding: '8px 16px',
              borderRadius: '4px',
              fontWeight: 'bold',
              fontSize: '14px',
              color: 'white',
              background: badge.class === 'sold' ? '#000' : '#dc3545'
            }}>
              {badge.text}
            </div>
          )}
          <Link href={`/inventory/${slug}`}>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                style={{ 
                  width: '100%', 
                  height: '330px', 
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            ) : (
              <div style={{ 
                width: '100%', 
                height: '330px', 
                background: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ color: '#999' }}>No Image</span>
              </div>
            )}
          </Link>
        </div>

        {/* Content Section */}
        <div style={{ flex: 1, padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>
              <Link href={`/inventory/${slug}`} style={{ color: '#000', textDecoration: 'none' }}>
                {title}
              </Link>
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px 30px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <strong>Availability</strong>
                <span className={`badge ${availability === 'In Stock' ? 'badge-available' : 'badge-sold'}`} style={{
                  padding: '4px 12px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '600',
                  background: availability === 'In Stock' ? '#28a745' : '#000',
                  color: 'white'
                }}>
                  {availability}
                </span>
              </div>
              {product.stockNumber && (
                <div><strong>Stock #</strong> {product.stockNumber}</div>
              )}
              {product.length && (
                <div><strong>LENGTH</strong> {product.length}</div>
              )}
              {product.beam && (
                <div><strong>BEAM</strong> {product.beam}</div>
              )}
              {horsepower && (
                <div><strong>Horsepower</strong> {horsepower}</div>
              )}
              {usage && (
                <div><strong>Usage</strong> {usage}</div>
              )}
              {product.style && (
                <div><strong>Style</strong> {product.style}</div>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#000' }}>
              {price ? `$${price.toLocaleString()}` : 'Call for Price'}
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'nowrap' }}>
              <button style={{
                background: '#ffc107',
                color: '#000',
                padding: '10px 18px',
                border: 'none',
                borderRadius: '5px',
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontSize: '14px'
              }}>
                📧 Request Quote
              </button>
              <button style={{
                background: 'white',
                color: '#000',
                padding: '10px 18px',
                border: '2px solid #ddd',
                borderRadius: '5px',
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontSize: '14px'
              }}>
                📞 Quote by Phone
              </button>
              <Link href={`/inventory/${slug}`} style={{
                background: 'white',
                color: '#000',
                padding: '10px 18px',
                border: '2px solid #ddd',
                borderRadius: '5px',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                whiteSpace: 'nowrap',
                fontSize: '14px'
              }}>
                View Details »
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}