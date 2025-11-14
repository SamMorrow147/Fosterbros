'use client'
import { useState, useEffect } from 'react'
import inventory from '@/data/inventory.json'

export default function DebugInventoryPage() {
    const [testProduct, setTestProduct] = useState(null);

    useEffect(() => {
        // Get first product with images
        const productWithImages = inventory.find(p => p.imagesFull && p.imagesFull.length > 0);
        setTestProduct(productWithImages);
    }, []);

    if (!testProduct) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>Debug Inventory Images</h1>
            
            <div style={{ border: '2px solid red', padding: '20px', marginBottom: '20px' }}>
                <h2>Product Data:</h2>
                <p><strong>Title:</strong> {testProduct.title}</p>
                <p><strong>ID:</strong> {testProduct.productId}</p>
                <p><strong>Images Array Length:</strong> {testProduct.imagesFull?.length || 0}</p>
                <p><strong>First Image Path:</strong></p>
                <code style={{ background: '#f0f0f0', padding: '10px', display: 'block' }}>
                    {testProduct.imagesFull?.[0] || 'NO IMAGE PATH'}
                </code>
            </div>

            <div style={{ border: '2px solid blue', padding: '20px', marginBottom: '20px' }}>
                <h2>Test 1: Direct img tag with inventory image</h2>
                <img 
                    src={testProduct.imagesFull?.[0]} 
                    alt="Test 1"
                    style={{ width: '300px', height: '200px', objectFit: 'cover', border: '1px solid green' }}
                    onError={(e) => {
                        console.error('Test 1 failed:', e.target.src);
                        e.target.style.background = 'red';
                    }}
                    onLoad={() => console.log('Test 1 loaded successfully')}
                />
            </div>

            <div style={{ border: '2px solid blue', padding: '20px', marginBottom: '20px' }}>
                <h2>Test 2: Hardcoded working image path</h2>
                <img 
                    src="/assets/images/car-list/car1.jpg" 
                    alt="Test 2"
                    style={{ width: '300px', height: '200px', objectFit: 'cover', border: '1px solid green' }}
                    onError={() => console.error('Test 2 failed')}
                    onLoad={() => console.log('Test 2 loaded successfully')}
                />
            </div>

            <div style={{ border: '2px solid blue', padding: '20px', marginBottom: '20px' }}>
                <h2>Test 3: All product images</h2>
                {inventory.slice(0, 10).map((product, index) => (
                    <div key={product.id} style={{ marginBottom: '10px', padding: '10px', background: '#f9f9f9' }}>
                        <p><strong>{index + 1}. {product.title}</strong></p>
                        <p>Image path: <code>{product.imagesFull?.[0] || 'NO IMAGE'}</code></p>
                        <img 
                            src={product.imagesFull?.[0] || '/assets/images/car-list/car1.jpg'} 
                            alt={product.title}
                            style={{ width: '200px', height: '150px', objectFit: 'cover', border: '1px solid #ccc' }}
                            onError={(e) => {
                                console.error(`Image failed for ${product.title}:`, e.target.src);
                                e.target.src = '/assets/images/car-list/car1.jpg';
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
