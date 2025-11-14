'use client'
import Link from "next/link"

export default function SimpleProductCard({ product }) {
  if (!product) return null;

  // Use first available image from product
  const imageUrl = product.imagesFull?.[0] || product.imagesThumb?.[0] || null;
  
  // If no image, show a placeholder div
  if (!imageUrl) {
    return (
      <div className="tf-car-service" style={{ border: '2px solid blue', padding: '10px' }}>
        <div style={{ 
          width: '100%', 
          height: '200px', 
          background: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #ccc'
        }}>
          <span>No Image Available</span>
        </div>
        <div className="content">
          <h5>{product.title}</h5>
          <p>${product.price?.toLocaleString() || 'Call'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tf-car-service" style={{ border: '2px solid blue', padding: '10px' }}>
      <div style={{ marginBottom: '10px' }}>
        <strong>DEBUG: {product.title}</strong>
        <br />
        <small>Image: {imageUrl}</small>
      </div>
      
      <img
        src={imageUrl}
        alt={product.title}
        style={{ 
          width: '100%', 
          height: '200px', 
          objectFit: 'cover',
          border: '1px solid red',
          display: 'block'
        }}
        onError={(e) => {
          console.error('SimpleCard Image failed:', product.title, imageUrl);
          // Don't try to load fallback, just hide the image
          e.target.style.display = 'none';
        }}
        onLoad={() => {
          console.log('SimpleCard Image loaded:', product.title);
        }}
      />
      
      <div className="content">
        <h5>{product.title}</h5>
        <p>${product.price?.toLocaleString() || 'Call'}</p>
      </div>
    </div>
  );
}
