const fs = require('fs').promises;
const path = require('path');

async function generatePages() {
    console.log('🚀 Generating product pages from scraped content...\n');
    
    const dataPath = path.join(__dirname, '../data/product-pages.json');
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

    const slugMappings = {
        'paddleboats': { path: 'paddleboats/page.js', title: 'Paddleboats' },
        'ultralegs': { path: 'ultralegs/page.js', title: 'Ultra Legs' },
        'traxstech': { path: 'traxstech/page.js', title: 'Traxstech' },
        'hondaoutboards': { path: 'hondaoutboards/page.js', title: 'Honda Outboards' },
        'yamahaoutboards': { path: 'yamahaoutboards/page.js', title: 'Yamaha Outboards' }
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
        
        const dir = path.dirname(pagePath);
        await fs.mkdir(dir, { recursive: true });
        
        await fs.writeFile(pagePath, pageContent);
        
        console.log(`✅ Created: /app/${mapping.path}`);
        created++;
    }
    
    console.log(`\n✅ Successfully generated ${created} product pages!`);
}

generatePages().catch(console.error);

