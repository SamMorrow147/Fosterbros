# White-Label Dealer Setup Guide

## 🚀 Quick Start: Set Up a New Dealer Site

Follow these steps to transform this Foster Bros Marine site into a new dealer's site **without touching any code**.

---

## Step 1: Update Dealer Information

Edit `/data/dealer.json`:

```json
{
  "dealerName": "Your Dealer Name Here",
  "logo": "/assets/images/logo/your-logo.png",
  "primaryColor": "#YOUR_PRIMARY_COLOR",
  "secondaryColor": "#YOUR_SECONDARY_COLOR",
  "accentColor": "#YOUR_ACCENT_COLOR",
  "phone": "(XXX) XXX-XXXX",
  "email": "info@yourdealer.com",
  "address": {
    "street": "123 Your Street",
    "city": "Your City",
    "state": "ST",
    "zip": "12345"
  },
  "hours": {
    "weekdays": "Mon-Fri: 9:00 AM - 6:00 PM",
    "saturday": "Sat: 9:00 AM - 5:00 PM",
    "sunday": "Sun: Closed"
  },
  "social": {
    "facebook": "https://facebook.com/yourdealer",
    "instagram": "https://instagram.com/yourdealer",
    "youtube": "https://youtube.com/yourdealer"
  },
  "inventorySource": "/data/inventory.json",
  "tagline": "Your tagline here"
}
```

---

## Step 2: Update Filter Options (If Needed)

If your dealer carries different brands or types, edit `/data/filterOptions.json`:

```json
{
  "usage": ["New", "Used", "Certified Pre-Owned"],
  "years": [2026, 2025, 2024, 2023, 2022, 2021],
  "types": [
    "Your Types Here"
  ],
  "makes": [
    "Your Brands Here"
  ],
  "styles": [
    "Your Styles/Series Here"
  ],
  "priceRange": {
    "min": 0,
    "max": 500000,
    "step": 1000
  },
  "lengthRange": {
    "min": 10,
    "max": 40,
    "step": 1
  },
  "beamRange": {
    "min": 50,
    "max": 150,
    "step": 1
  },
  "horsepower": [25, 50, 75, 115, 150, 200, 250, 300, 400]
}
```

---

## Step 3: Replace Inventory Data

### Option A: Manual JSON Entry

Edit `/data/inventory.json` and add your products:

```json
[
  {
    "id": "1",
    "slug": "2025-your-product-slug",
    "title": "2025 Your Product Title",
    "brand": "Brand Name",
    "make": "Make Name",
    "category": "Category",
    "type": "Type",
    "style": "Style",
    "usage": "New",
    "availability": "In Stock",
    "year": 2025,
    "price": 49999,
    "length": 22.0,
    "beam": 96,
    "fuelType": "Gas",
    "engineType": "Outboard",
    "horsepower": 200,
    "imagesFull": [
      "/assets/images/inventory/your-product-1.jpg",
      "/assets/images/inventory/your-product-2.jpg"
    ],
    "imagesThumb": [
      "/assets/images/inventory/thumbs/your-product-1.jpg"
    ],
    "description": "Your product description here",
    "specs": {
      "dryWeight": 2500,
      "hullMaterial": "Aluminum",
      "color": "Blue/White",
      "capacity": "10 persons",
      "fuelCapacity": "30 gallons"
    },
    "location": "Your City, ST",
    "stockNumber": "ABC123"
  }
]
```

### Option B: Import from Dealer Spike

If you're scraping from a Dealer Spike site:

1. Use the scraper to export inventory data
2. Transform the data to match the schema above
3. Replace `/data/inventory.json` with the new data

---

## Step 4: Add Product Images

1. Create folder: `/public/assets/images/inventory/`
2. Add your product images:
   - Full size: `/public/assets/images/inventory/product-name-1.jpg`
   - Thumbnails: `/public/assets/images/inventory/thumbs/product-name-1.jpg`
3. Update image paths in `inventory.json`

**Image Guidelines:**
- Full size: 1200x800px (minimum)
- Thumbnails: 300x200px
- Format: JPG or PNG
- Naming: Use product slug for consistency

---

## Step 5: Update Logo

1. Add your logo to: `/public/assets/images/logo/your-logo.png`
2. Update path in `dealer.json`
3. Recommended size: 200x60px (transparent PNG)

---

## Step 6: Update Site Metadata

Edit `/app/layout.js` (Line 26-29):

```javascript
export const metadata = {
  title: 'Your Dealer Name - Boats, Pontoons, Motors & Trailers',
  description: 'Your dealer description here...',
}
```

---

## Step 7: Customize Colors (Optional)

Edit `/public/assets/css/custom-marine.css` to match your brand:

```css
:root {
  --primary-color: #YOUR_PRIMARY_COLOR;
  --secondary-color: #YOUR_SECONDARY_COLOR;
  --accent-color: #YOUR_ACCENT_COLOR;
}
```

Or update the existing CSS variables in the theme.

---

## Step 8: Update Navigation (If Needed)

If you need to adjust the navigation menus:

**Desktop Menu:** `/components/layout/Menu.js`
**Mobile Menu:** `/components/layout/MobileMenu.js`

Most dealers won't need to change this—it's data-driven from your filter options.

---

## Step 9: Test Your Changes

1. Start dev server: `npm run dev`
2. Visit: http://localhost:3000
3. Test all filters and categories
4. Verify product details display correctly
5. Check mobile responsiveness

---

## Step 10: Deploy

### Deploy to Vercel (Recommended)

1. Push to GitHub
2. Import in Vercel
3. Auto-deploys on every push
4. Connect custom domain

### Build for Production

```bash
npm run build
npm start
```

---

## 🔍 Troubleshooting

### Products Not Showing
- Check `inventory.json` syntax (use JSON validator)
- Verify all required fields are present
- Check console for errors

### Filters Not Working
- Verify filter values in `filterOptions.json` match inventory data
- Check that field names are consistent (case-sensitive)
- Clear browser cache

### Images Not Loading
- Check image paths are correct
- Verify images exist in `/public/assets/images/`
- Check file extensions match (jpg vs jpeg)

### Styles Not Applying
- Clear browser cache
- Check CSS file is imported in `layout.js`
- Verify CSS syntax is valid

---

## 📋 Checklist Before Going Live

- [ ] All dealer info updated in `dealer.json`
- [ ] All inventory products added to `inventory.json`
- [ ] All product images uploaded and paths correct
- [ ] Logo uploaded and displayed
- [ ] Site metadata updated (title, description)
- [ ] Colors customized (if needed)
- [ ] All filters tested with real data
- [ ] Mobile responsiveness verified
- [ ] All links working (navigation, CTAs)
- [ ] Contact page updated with dealer info
- [ ] Social media links working
- [ ] Production build tested
- [ ] Domain connected
- [ ] SSL certificate active

---

## 🎯 Key Files to Customize

**Must Update:**
1. `/data/dealer.json` - Dealer info
2. `/data/inventory.json` - Your products
3. `/app/layout.js` - Site metadata
4. Logo image

**Optional Updates:**
5. `/data/filterOptions.json` - Filter options
6. `/public/assets/css/custom-marine.css` - Colors/styling
7. `/components/layout/Menu.js` - Navigation

**Never Need to Touch:**
- All files in `/util/` (filter logic)
- All files in `/components/inventory/` (UI components)
- Inventory page files in `/app/inventory/`

---

## 💡 Pro Tips

1. **Test with Sample Data First**: Keep the Foster Bros data while you learn the system
2. **Validate JSON**: Use jsonlint.com to check your JSON syntax
3. **Backup Before Changes**: Copy files before editing
4. **Use Descriptive Slugs**: Makes URLs SEO-friendly
5. **Optimize Images**: Compress before uploading (use TinyPNG)
6. **Keep Stock Numbers**: Helps track products
7. **Update Regularly**: Keep inventory.json current

---

## 🆘 Need Help?

1. Read `IMPLEMENTATION_SUMMARY.md` for technical details
2. Check code comments in `/util/` files
3. Verify JSON schema matches documentation
4. Test one product at a time

---

**Time to Deploy: ~2-4 hours** (with inventory data ready)

Good luck with your new dealer site! 🚀


