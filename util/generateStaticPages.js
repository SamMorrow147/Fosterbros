const fs = require('fs').promises;
const path = require('path');

async function generatePages() {
    console.log('🚀 Generating pages from scraped content...\n');
    
    // Read the scraped data
    const dataPath = path.join(__dirname, '../data/static-pages.json');
    const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));
    
    const pageTemplate = (slug, title, content, breadcrumbTitle) => `import Layout from "@/components/layout/Layout"

export default function ${slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, '')}Page() {
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

    const slugTitles = {
        'paddleboats': 'Paddleboats',
        'ultralegs': 'Ultra Legs',
        'traxstech': 'Traxstech',
        'hondaoutboards': 'Honda Outboards',
        'yamahaoutboards': 'Yamaha Outboards',
        'service-request': 'Service Request',
        'winterization-storage': 'Winterization & Storage',
        'winterize-liability-form': 'Winter Storage Liability Form',
        'pontoon-trailer-rentals': 'Pontoon Trailer Rentals',
        'about': 'About Us',
        'events': 'Events',
        'financing': 'Financing',
        'annual-water-demo': 'Annual Water Demo',
        'careers': 'Careers',
        'bass-cat': 'Bass Cat',
        'factory-promotions': 'Factory Promotions'
    };
    
    let created = 0;
    
    for (const [slug, pageData] of Object.entries(data)) {
        const breadcrumbTitle = slugTitles[slug] || pageData.title;
        const pageContent = pageTemplate(slug, pageData.title, pageData.content, breadcrumbTitle);
        
        const pagePath = path.join(__dirname, `../app/${slug}/page.js`);
        await fs.writeFile(pagePath, pageContent);
        
        console.log(`✅ Created: /app/${slug}/page.js`);
        created++;
    }
    
    console.log(`\n✅ Successfully generated ${created} pages!`);
}

generatePages().catch(console.error);


