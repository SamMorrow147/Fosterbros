const fs = require('fs').promises;
const path = require('path');

async function generatePages() {
    console.log('🚀 Generating pages from correctly scraped content...\n');
    
    // Read the scraped data
    const dataPath = path.join(__dirname, '../data/correct-pages.json');
    const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));
    
    const pageTemplate = (slug, title, content, breadcrumbTitle) => `import Layout from "@/components/layout/Layout"

export default function ${slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, '').replace(/\d/g, '')}Page() {
    return (
        <Layout headerStyle={3} footerStyle={1} breadcrumbTitle="${breadcrumbTitle}">
            <div className="themesflat-container">
                <div className="row">
                    <div className="col-12">
                        <div className="content-page" style={{ padding: '80px 0' }}>
                            <div dangerouslySetInnerHTML={{ __html: \`${content.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
`;

    const slugMappings = {
        'service': { path: 'service/page.js', title: 'Service' },
        'winterization-storage': { path: 'winterization-storage/page.js', title: 'Winterization & Storage' },
        'winterize-liability-form': { path: 'winterize-liability-form/page.js', title: 'Winter Storage Liability Form' },
        'pontoon-trailer-rentals': { path: 'pontoon-trailer-rentals/page.js', title: 'Pontoon Trailer Rentals' },
        'company': { path: 'company/page.js', title: 'Company Info' },
        'about': { path: 'about/page.js', title: 'About Us' },
        'blog': { path: 'blog/page.js', title: 'Blog' },
        'blog-post-1': { path: 'blog/5-tips-for-proper-trailer-maintenance/page.js', title: '5 Tips for Proper Trailer Maintenance' },
        'blog-post-2': { path: 'blog/top-tips-for-how-to-purchase-the-right-boat-at-a-show/page.js', title: 'Top Tips for How to Purchase the Right Boat at a Show' },
        'events': { path: 'events/page.js', title: 'Events' },
        'annual-water-demo': { path: 'annual-water-demo/page.js', title: 'Annual Water Demo' },
        'careers': { path: 'careers/page.js', title: 'Careers' }
    };
    
    let created = 0;
    
    for (const [slug, pageData] of Object.entries(data)) {
        const mapping = slugMappings[slug];
        if (!mapping) {
            console.log(`⚠️  No mapping found for: ${slug}`);
            continue;
        }
        
        const breadcrumbTitle = mapping.title || pageData.title;
        const pageContent = pageTemplate(slug, pageData.title, pageData.content, breadcrumbTitle);
        
        const pagePath = path.join(__dirname, `../app/${mapping.path}`);
        
        // Create directory if it doesn't exist
        const dir = path.dirname(pagePath);
        await fs.mkdir(dir, { recursive: true });
        
        await fs.writeFile(pagePath, pageContent);
        
        console.log(`✅ Created: /app/${mapping.path}`);
        created++;
    }
    
    console.log(`\n✅ Successfully generated ${created} pages!`);
}

generatePages().catch(console.error);


