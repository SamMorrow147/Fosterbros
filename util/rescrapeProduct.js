const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const https = require('https');

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve();
        });
      } else {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function rescrapeProduct(productUrl, productId) {
  console.log(`🔄 Re-scraping product: ${productUrl}`);
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    await page.goto(productUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Wait for images to load
    await page.waitForTimeout(5000);
    
    // Debug: Take a screenshot
    await page.screenshot({ path: path.join(__dirname, 'debug-bf115.png'), fullPage: false });
    console.log('📸 Screenshot saved to util/debug-bf115.png');
    
    // Debug: Log all image elements found
    const debugImages = await page.evaluate(() => {
      const allImages = document.querySelectorAll('img');
      return Array.from(allImages).map(img => ({
        src: img.src,
        alt: img.alt,
        class: img.className,
        id: img.id
      }));
    });
    console.log(`🔍 Found ${debugImages.length} total img elements on page`);
    console.log('First few images:', debugImages.slice(0, 5));
    
    // Extract all product data
    const productData = await page.evaluate(() => {
      // Get title
      const title = document.querySelector('h1.title')?.innerText.trim() || 
                   document.querySelector('.product-title')?.innerText.trim() ||
                   document.querySelector('h1')?.innerText.trim();
      
      // Get dealer notes
      const dealerNotes = document.querySelector('#dealerDescription')?.innerText.trim() ||
                         document.querySelector('.dealer-notes')?.innerText.trim() || '';
      
      // Get product features
      const productFeatures = document.querySelector('.product-features')?.innerText.trim() ||
                             document.querySelector('#productFeatures')?.innerText.trim() || '';
      
      // Get all images from the gallery - try multiple selectors
      const imageSelectors = [
        '.media-container img',
        '.carousel-item img',
        '.VehicleDetailPage-gallery img',
        '.product-images img',
        '.gallery-item img',
        '[class*="gallery"] img',
        '[class*="slider"] img',
        '[class*="image"] img',
        'img[src*="inventory"]',
        '.slick-slide img',
        'picture img'
      ];
      
      let images = [];
      for (const selector of imageSelectors) {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
          console.log(`Found ${elements.length} images with selector: ${selector}`);
          images = Array.from(elements)
            .map(img => {
              // Try multiple attributes
              return img.src || 
                     img.getAttribute('data-src') || 
                     img.getAttribute('data-lazy') ||
                     img.getAttribute('data-original');
            })
            .filter(src => src && 
                          src.startsWith('http') && 
                          !src.includes('placeholder') && 
                          !src.includes('loading') &&
                          !src.includes('logo') &&
                          (src.includes('inventory') || src.includes('product')));
          
          if (images.length > 0) break;
        }
      }
      
      // Remove duplicates
      images = [...new Set(images)];
      
      // Extract actual image URLs from Thumb.aspx URLs
      images = images.map(url => {
        // Check if it's a Thumb.aspx URL
        if (url.includes('Thumb.aspx')) {
          const match = url.match(/img=(\/\/[^&]+)/);
          if (match) {
            // Convert //cdnmedia.endeavorsuite.com to https://cdnmedia.endeavorsuite.com
            let actualUrl = match[1];
            if (actualUrl.startsWith('//')) {
              actualUrl = 'https:' + actualUrl;
            }
            return actualUrl;
          }
        }
        return url;
      });
      
      // Remove any remaining non-image URLs
      images = images.filter(url => 
        url.match(/\.(jpg|jpeg|png|gif|webp)(\?|$)/i)
      );
      
      // Get specs
      const specs = {};
      const specElements = document.querySelectorAll('.spec-item, [class*="spec"] tr, .specifications tr');
      specElements.forEach(el => {
        const label = el.querySelector('.spec-label, th, td:first-child')?.innerText.trim();
        const value = el.querySelector('.spec-value, td:last-child')?.innerText.trim();
        if (label && value && label !== value) {
          specs[label] = value;
        }
      });
      
      // Get price
      const priceElement = document.querySelector('.price, [class*="price"]');
      const priceText = priceElement?.innerText.trim() || '';
      const price = parseFloat(priceText.replace(/[^0-9.]/g, '')) || null;
      
      return {
        title,
        dealerNotes,
        productFeatures,
        images,
        specs,
        price
      };
    });
    
    console.log(`✅ Scraped data for: ${productData.title}`);
    console.log(`📷 Found ${productData.images.length} images`);
    
    // Download images
    const imagesDir = path.join(__dirname, '../public/assets/images/inventory', productId);
    
    // Clear existing images
    if (fs.existsSync(imagesDir)) {
      const files = fs.readdirSync(imagesDir);
      files.forEach(file => {
        fs.unlinkSync(path.join(imagesDir, file));
      });
      console.log('🗑️  Cleared old images');
    } else {
      fs.mkdirSync(imagesDir, { recursive: true });
    }
    
    const downloadedImages = [];
    
    for (let i = 0; i < productData.images.length; i++) {
      const imageUrl = productData.images[i];
      // Extract extension from URL, removing any query parameters
      const urlPath = new URL(imageUrl).pathname;
      const ext = path.extname(urlPath).split('?')[0] || '.jpg';
      const filename = `honda-marine-bf115-${i + 1}${ext}`;
      const filepath = path.join(imagesDir, filename);
      
      try {
        console.log(`📥 Downloading image ${i + 1}/${productData.images.length}...`);
        await downloadImage(imageUrl, filepath);
        downloadedImages.push(`/assets/images/inventory/${productId}/${filename}`);
        console.log(`✅ Downloaded: ${filename}`);
      } catch (error) {
        console.error(`❌ Failed to download image ${i + 1}: ${error.message}`);
      }
    }
    
    await browser.close();
    
    return {
      ...productData,
      imagesFull: downloadedImages,
      imagesThumb: downloadedImages.length > 0 ? [downloadedImages[0]] : [],
      scrapedAt: new Date().toISOString()
    };
    
  } catch (error) {
    await browser.close();
    throw error;
  }
}

// Run the scraper
const PRODUCT_URL = 'https://www.fosterbrosmarine.com/inventory/honda-marine-bf115-delano-mn-55328-12737261i';
const PRODUCT_ID = '12737261i';

rescrapeProduct(PRODUCT_URL, PRODUCT_ID)
  .then(async (scrapedData) => {
    console.log('\n📋 Scraped Data:');
    console.log(JSON.stringify(scrapedData, null, 2));
    
    // Update inventory.json
    const inventoryPath = path.join(__dirname, '../data/inventory.json');
    const inventory = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));
    
    const itemIndex = inventory.findIndex(item => item.productId === PRODUCT_ID);
    if (itemIndex !== -1) {
      inventory[itemIndex] = {
        ...inventory[itemIndex],
        imagesFull: scrapedData.imagesFull,
        imagesThumb: scrapedData.imagesThumb,
        dealerNotes: scrapedData.dealerNotes || inventory[itemIndex].dealerNotes,
        productFeatures: scrapedData.productFeatures || inventory[itemIndex].productFeatures,
        specs: { ...inventory[itemIndex].specs, ...scrapedData.specs },
        scrapedAt: scrapedData.scrapedAt
      };
      
      fs.writeFileSync(inventoryPath, JSON.stringify(inventory, null, 2));
      console.log('\n✅ Updated inventory.json');
    }
    
    // Update inventory-complete.json
    const inventoryCompletePath = path.join(__dirname, '../data/inventory-complete.json');
    const inventoryComplete = JSON.parse(fs.readFileSync(inventoryCompletePath, 'utf8'));
    
    const itemIndexComplete = inventoryComplete.findIndex(item => item.productId === PRODUCT_ID);
    if (itemIndexComplete !== -1) {
      inventoryComplete[itemIndexComplete] = {
        ...inventoryComplete[itemIndexComplete],
        imagesFull: scrapedData.imagesFull,
        imagesThumb: scrapedData.imagesThumb,
        dealerNotes: scrapedData.dealerNotes || inventoryComplete[itemIndexComplete].dealerNotes,
        productFeatures: scrapedData.productFeatures || inventoryComplete[itemIndexComplete].productFeatures,
        specs: { ...inventoryComplete[itemIndexComplete].specs, ...scrapedData.specs },
        scrapedAt: scrapedData.scrapedAt
      };
      
      fs.writeFileSync(inventoryCompletePath, JSON.stringify(inventoryComplete, null, 2));
      console.log('✅ Updated inventory-complete.json');
    }
    
    console.log('\n🎉 Re-scraping complete!');
  })
  .catch(error => {
    console.error('❌ Error:', error);
    process.exit(1);
  });

