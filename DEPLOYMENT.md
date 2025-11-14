# 🚀 Vercel Deployment Guide

## Pre-Deployment Checklist

✅ All configuration files are ready  
✅ Environment variables are configured  
✅ Build process tested locally  
✅ Images optimized for web  

---

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):
```bash
npm i -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy** (from the `motorx` directory):
```bash
vercel
```

4. **Deploy to Production**:
```bash
vercel --prod
```

### Option 2: Deploy via Vercel Dashboard

1. **Push your code to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit - Foster Bros Marine site"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Configure Project**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `motorx` (if deploying from monorepo)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

4. **Add Environment Variables** (in Vercel Dashboard):
   - Go to Project Settings → Environment Variables
   - Add variables from `.env.example`:
     - `NEXT_PUBLIC_SITE_URL` = `https://your-domain.vercel.app`
     - `NEXT_PUBLIC_SITE_NAME` = `Foster Bros Marine`
     - `NEXT_PUBLIC_CONTACT_EMAIL` = `info@fosterbrosmarine.com`
     - `NEXT_PUBLIC_CONTACT_PHONE` = `(763) 972-3200`

5. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)

---

## Custom Domain Setup

After deployment, add your custom domain:

1. Go to **Project Settings** → **Domains**
2. Add your domain (e.g., `fosterbrosmarine.com`)
3. Follow Vercel's instructions to update DNS records
4. Update `NEXT_PUBLIC_SITE_URL` environment variable with your custom domain

### DNS Configuration Example:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## Build Optimization

### Current Configuration:
- ✅ Image optimization disabled (better for static assets)
- ✅ Static JSON data included in build
- ✅ CSS/JS assets cached for 1 year
- ✅ Next.js 14 with App Router

### Build Size Optimization Tips:

1. **Remove unused dependencies** (optional):
```bash
npm prune --production
```

2. **Analyze bundle size**:
```bash
npm install --save-dev @next/bundle-analyzer
```

Then add to `next.config.js`:
```javascript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer(nextConfig)
```

Run analysis:
```bash
ANALYZE=true npm run build
```

---

## Environment Variables Reference

### Required for Production:
- `NEXT_PUBLIC_SITE_URL` - Your production URL
- `NEXT_PUBLIC_SITE_NAME` - Site name for metadata

### Optional:
- `NEXT_PUBLIC_CONTACT_EMAIL` - Contact email
- `NEXT_PUBLIC_CONTACT_PHONE` - Contact phone
- `NEXT_PUBLIC_GA_ID` - Google Analytics ID
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - For maps integration

---

## Post-Deployment Testing

After deployment, test these critical pages:

### Core Pages:
- ✅ Homepage: `/`
- ✅ All Inventory: `/inventory`
- ✅ About: `/about`
- ✅ Contact: `/contact-us`

### Inventory Pages:
- ✅ By Type: `/inventory/type/Pontoons`
- ✅ By Brand: `/inventory/brand/Starcraft`
- ✅ By Usage: `/inventory/usage/New`
- ✅ Product Detail: `/inventory/[slug]` (test a few products)

### Test Filters:
- ✅ Type filters work
- ✅ Price range slider works
- ✅ Multiple filters combine correctly
- ✅ URL parameters persist on page refresh

### Mobile Testing:
- ✅ Mobile menu works
- ✅ Images load correctly
- ✅ Forms are responsive
- ✅ Filters work on mobile

---

## Monitoring & Analytics

### Vercel Analytics (Built-in):
Vercel provides free analytics for:
- Page views
- Load times
- Geographic distribution

Enable in: **Project Settings** → **Analytics**

### Google Analytics (Optional):
Add to `.env.production`:
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Then add to `app/layout.js`:
```javascript
<Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
```

---

## Troubleshooting

### Build Fails

**Error: Module not found**
- Solution: Run `npm install` locally and test build
- Check for missing dependencies in `package.json`

**Error: Out of memory**
- Solution: The build might be too large
- Check Vercel plan limits
- Consider removing large backup JSON files

### Images Not Loading

**404 errors on images**
- Verify images are in `public/` directory
- Check image paths start with `/` not `./`
- Ensure `.vercelignore` doesn't exclude images

### Fonts Not Loading

**FOUT (Flash of Unstyled Text)**
- Already configured with `next/font/google`
- Check `app/layout.js` font configuration
- Verify font families in CSS

---

## Maintenance

### Update Content:
1. Edit JSON files in `data/` directory
2. Commit and push to GitHub
3. Vercel auto-deploys on push

### Update Inventory:
1. Run scraper scripts locally (in `util/`)
2. Update `data/inventory.json`
3. Commit and push
4. Vercel rebuilds automatically

### Manual Redeploy:
```bash
vercel --prod
```

Or use the Vercel Dashboard: **Deployments** → **Redeploy**

---

## Performance Optimization

Current Lighthouse scores should be:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 95+

### Tips to improve:
1. ✅ Images already unoptimized for faster initial load
2. ✅ CSS minified
3. ✅ Static generation for all pages
4. Consider adding:
   - Image lazy loading
   - Font preloading
   - Service worker for offline support

---

## Security

### Current Security Features:
- ✅ No server-side secrets exposed
- ✅ Environment variables properly configured
- ✅ HTTPS enforced by Vercel
- ✅ Headers configured for caching

### Recommendations:
1. Add security headers in `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

2. Enable Vercel's DDoS protection (automatic on Pro plan)

---

## Support

### Vercel Documentation:
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Custom Domains](https://vercel.com/docs/concepts/projects/domains)

### Need Help?
- Vercel Support: https://vercel.com/support
- Next.js Docs: https://nextjs.org/docs

---

## Cost Estimation

### Vercel Hobby Plan (FREE):
- ✅ Perfect for this site
- ✅ Unlimited bandwidth
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Auto-scaling

### When to Upgrade to Pro ($20/month):
- High traffic (>100GB bandwidth)
- Need password protection
- Want advanced analytics
- Require team collaboration

---

**Your site is ready to deploy! 🚀**

Run `vercel` in the `motorx` directory to get started.

