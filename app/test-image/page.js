'use client'
import { useState } from 'react'

export default function TestImagePage() {
  const [imageError, setImageError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const testImagePath = "/assets/images/inventory/13589213i/2017-manitou-aurora-le-1-IMG_8384.JPG";
  const smallerImagePath = "/assets/images/inventory/13735618i/2025-starcraft-exs-3--hail-dam-1-37dedcdc-a2f3-4672-a6fe-3be407ec7116.jpg";
  const fallbackImage = "/assets/images/car-list/car-list1.jpg";

  return (
    <div style={{ padding: '20px' }}>
      <h1>Image Loading Test</h1>
      
      <div>
        <h2>Test Image Path:</h2>
        <code>{testImagePath}</code>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Image Status:</h2>
        {imageError && <p style={{ color: 'red' }}>Error: {imageError}</p>}
        {imageLoaded && <p style={{ color: 'green' }}>Image loaded successfully!</p>}
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Test Image:</h2>
        <img
          src={testImagePath}
          alt="Test Image"
          width="400"
          height="300"
          style={{ 
            objectFit: 'cover', 
            border: '2px solid #ccc',
            maxWidth: '100%',
            height: 'auto'
          }}
          onLoad={() => {
            console.log('Image loaded successfully');
            setImageLoaded(true);
            setImageError(null);
          }}
          onError={(e) => {
            console.error('Image failed to load:', testImagePath);
            setImageError(`Failed to load: ${testImagePath}`);
            setImageLoaded(false);
            // Try fallback
            e.target.src = fallbackImage;
          }}
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Fallback Image Test:</h2>
        <img
          src={fallbackImage}
          alt="Fallback Image"
          width="400"
          height="300"
          style={{ 
            objectFit: 'cover', 
            border: '2px solid #ccc',
            maxWidth: '100%',
            height: 'auto'
          }}
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Simple HTML img tag:</h2>
        <img 
          src="/assets/images/inventory/13589213i/2017-manitou-aurora-le-1-IMG_8384.JPG" 
          alt="Direct HTML"
          style={{ width: '200px', height: 'auto' }}
        />
      </div>
    </div>
  );
}
