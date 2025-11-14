# Foster Bros Marine Data Import

## ✅ What Was Imported

All **63 products** from Foster Bros Marine have been successfully imported into your MotorX project!

### 📊 Import Statistics

- **2,873 images** copied
- **63 products** added to inventory
- **89 total products** in your inventory (26 existing + 63 new)

### 📦 Product Breakdown

- **Boats**: 33 products
- **Engines**: 20 products (Honda Marine, Yamaha)
- **Pontoons**: 5 products
- **Trailers**: 4 products
- **Jet Boats**: 1 product

### 💰 Price Range

- Lowest: $6,500 (Mitey-Toon Mini Electric Pontoon)
- Highest: $163,026 (Kingfisher 2825 Coastal Express)
- Average: ~$35,451

---

## 📁 File Locations

### Images
```
/motorx/public/assets/images/inventory/
├── 12587443i/
│   ├── 2025-kingfisher-boats-1825-falcon-delano-mn-55328-1.png
│   ├── 2025-kingfisher-boats-1825-falcon-delano-mn-55328-2.png
├── 12985659i/
│   ├── 2025-skeeter-wx1910-delano-mn-55328-1.png
│   └── 2025-skeeter-wx1910-delano-mn-55328-2.png
└── ... (63 product folders total)
```

### Data Files
```
/motorx/data/
├── inventory.json              ← MAIN FILE (89 products - all inventory)
├── fosterbros_inventory.json   ← Foster Bros only (63 products)
└── inventory.backup.json       ← Backup of original inventory
```

---

## 🔍 How to Access the Data

### In Your React/Next.js Components

```javascript
// Import all inventory
import inventory from '@/data/inventory.json';

// Or just Foster Bros products
import fosterBros from '@/data/fosterbros_inventory.json';

// Find a product by ID
const product = inventory.find(p => p.productId === '12985659i');

// Get images for a product
const images = product.imagesFull; // Array of image paths
```

### Example Product Structure

```json
{
  "id": "1",
  "productId": "12985659i",
  "slug": "2025-skeeter-wx1910-12985659i",
  "title": "2025 Skeeter WX1910",
  "brand": "Skeeter",
  "category": "Boats",
  "usage": "New",
  "year": 2025,
  "price": 71895,
  "horsepower": 200,
  "imagesFull": [
    "/assets/images/inventory/12985659i/2025-skeeter-wx1910-delano-mn-55328-1.png",
    "/assets/images/inventory/12985659i/2025-skeeter-wx1910-delano-mn-55328-2.png"
  ],
  "specs": {
    "Engine Type": "V6",
    "Cylinders": "6",
    "Length Overall": "227 in.",
    "Fuel Capacity": "34 gal."
  },
  "location": "Delano, MN",
  "stockNumber": "SK-09186",
  "url": "https://www.fosterbrosmarine.com/inventory/...",
  "description": "..."
}
```

---

## 🌐 View in Your App

### Inventory Pages

Your imported products are now available at:

- **All Inventory**: `http://localhost:3000/inventory`
- **By Brand**: `http://localhost:3000/inventory/brand/skeeter`
- **By Type**: `http://localhost:3000/inventory/type/boats`
- **By Usage**: `http://localhost:3000/inventory/usage/new`
- **Product Details**: `http://localhost:3000/inventory/[slug]`

Example URLs:
- `http://localhost:3000/inventory/2025-skeeter-wx1910-12985659i`
- `http://localhost:3000/inventory/brand/kingfisher`
- `http://localhost:3000/inventory/type/engines`

---

## 🔧 Product Data Fields

Each product includes:

### Basic Info
- `id` - Sequential ID
- `productId` - Original Foster Bros ID (e.g., "12985659i")
- `slug` - URL-friendly identifier
- `title` - Full product name
- `brand` / `make` - Manufacturer
- `category` / `type` - Product category (Boats, Engines, etc.)

### Pricing & Availability
- `price` - Price in dollars (number, not string)
- `usage` - "New" or "Used"
- `availability` - "In Stock", etc.
- `year` - Model year

### Specifications
- `length` - Length in feet
- `beam` - Width in inches
- `horsepower` - Engine horsepower
- `fuelType` - Fuel type (Gas, Electric, etc.)
- `engineType` - Engine type (Outboard, etc.)
- `specs` - Object with all other specs

### Images
- `imagesFull` - Array of full-size image paths
- `imagesThumb` - Array of thumbnail image paths

### Additional
- `description` - Product description
- `location` - "Delano, MN"
- `stockNumber` - Stock/inventory number
- `vin` - VIN (if available)
- `url` - Original Foster Bros URL
- `scrapedAt` - When data was scraped

---

## 🎨 Using Images in Your Components

### Next.js Image Component

```jsx
import Image from 'next/image';

function ProductCard({ product }) {
  return (
    <div>
      <Image
        src={product.imagesFull[0]}
        alt={product.title}
        width={800}
        height={600}
      />
      <h3>{product.title}</h3>
      <p>${product.price?.toLocaleString()}</p>
    </div>
  );
}
```

### Regular img Tag

```jsx
function ProductGallery({ product }) {
  return (
    <div className="gallery">
      {product.imagesFull.map((img, index) => (
        <img 
          key={index}
          src={img} 
          alt={`${product.title} - Image ${index + 1}`}
        />
      ))}
    </div>
  );
}
```

---

## 🔄 Updating Data

If you need to rescrape or update the data:

1. Run the scraper again in `/Scrape/`:
   ```bash
   cd "/Users/sammorrow/Documents/Local Web Builds/Dealer Spite/Scrape"
   node downloadImages.js  # Scrape images
   node scrapeProductData.js  # Scrape data
   node cleanPrices.js  # Clean prices
   node importToProject.js  # Import to project
   ```

2. Your existing data is backed up in `inventory.backup.json`

---

## 📝 Notes

- All products have the original Foster Bros URL in the `url` field
- Product IDs are preserved in the `productId` field
- Images are organized by `productId` folder
- The existing 26 products in your inventory were preserved
- Total inventory is now 89 products

---

## 🎯 Next Steps

1. **Start your dev server**:
   ```bash
   cd motorx
   npm run dev
   ```

2. **Visit** `http://localhost:3000/inventory` to see your products

3. **Customize** product descriptions, images, or specs as needed

4. **Filter** and search functionality should work automatically with the new data

---

## ✅ Everything is Ready!

Your Foster Bros Marine inventory is now fully integrated into your MotorX project. All images are properly linked, data is structured correctly, and everything should work seamlessly with your existing inventory system.


