const fs = require('fs').promises;
const path = require('path');

async function generatePages() {
    console.log('🚀 Generating formatted product pages...\n');
    
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

    // Process each page with custom formatting
    const pages = {
        'paddleboats': {
            path: 'paddleboats/page.js',
            title: 'Paddleboats',
            content: data.paddleboats.content
        },
        'ultralegs': {
            path: 'ultralegs/page.js',
            title: 'Ultra Legs',
            content: processUltralegs(data.ultralegs.content)
        },
        'traxstech': {
            path: 'traxstech/page.js',
            title: 'Traxstech',
            content: processTraxstech(data.traxstech.content)
        },
        'hondaoutboards': {
            path: 'hondaoutboards/page.js',
            title: 'Honda Outboards',
            content: processHondaOutboards(data.hondaoutboards.content)
        },
        'yamahaoutboards': {
            path: 'yamahaoutboards/page.js',
            title: 'Yamaha Outboards',
            content: processYamahaOutboards(data.yamahaoutboards.content)
        }
    };
    
    let created = 0;
    
    for (const [slug, pageInfo] of Object.entries(pages)) {
        const pageContent = pageTemplate(slug, pageInfo.title, pageInfo.content, pageInfo.title);
        const pagePath = path.join(__dirname, `../app/${pageInfo.path}`);
        
        const dir = path.dirname(pagePath);
        await fs.mkdir(dir, { recursive: true });
        
        await fs.writeFile(pagePath, pageContent);
        
        console.log(`✅ Created: /app/${pageInfo.path}`);
        created++;
    }
    
    console.log(`\n✅ Successfully generated ${created} formatted product pages!`);
}

// Remove LeadForm and make video full width
function processUltralegs(content) {
    // Remove the entire LeadForm component section
    let processed = content.replace(
        /<div class="ari-column ari-col-xs-12 ari-col-sm-6 epgc\*" data-column-id="690435"[^>]*>.*?<\/div><\/div><\/div>/s,
        '</div></div>'
    );
    
    // Make video full width: change col-sm-8 col-sm-offset-2 to col-xs-12
    processed = processed.replace(
        /<div class="col-xs-12 col-sm-8 col-sm-offset-2">/g,
        '<div class="col-xs-12">'
    );
    
    return processed;
}

// Restructure Traxstech images into 3-column layout
function processTraxstech(content) {
    // Replace the float-images div with a Bootstrap grid
    let processed = content.replace(
        /<div class="float-images">.*?<\/div><\/div>/s,
        function(match) {
            const images = [
                { src: '//cdnmedia.endeavorsuite.com/images/organizations/64322193-6cef-4f8c-bb71-688c977b6511/traxstech/002.jpg?v=20250116194556', title: 'Traxstech System', desc: 'We stock a full line of Traxstech products. While we don\'t have everything they produce, we do stock the majority of the products used in our region. Call our parts or sales department to see what we have available for your boat.' },
                { src: '//cdnmedia.endeavorsuite.com/images/organizations/64322193-6cef-4f8c-bb71-688c977b6511/traxstech/03.jpg?v=20250116194556', title: 'Electronics Mounts', desc: 'We offer a large variety of electronics mounts that fit all units. They are available in different lengths and offer different pivot points with an infinite amount of adjustment.' },
                { src: '//cdnmedia.endeavorsuite.com/images/organizations/64322193-6cef-4f8c-bb71-688c977b6511/traxstech/04.jpeg?v=20250116194556', title: 'Rod Holders', desc: 'Traxstech has a wide variety of rod holders to meet all your fishing styles. From vertical trees, individual rod holders, downrigger rod holders, clamp-on rod holders, and horizontal tree style.' },
                { src: '//cdnmedia.endeavorsuite.com/images/organizations/64322193-6cef-4f8c-bb71-688c977b6511/traxstech/05.jpeg?v=20250116194556', title: 'Planer Reels & Masts', desc: 'Traxstech offers single and dual planer reel masts and replacement reels as well.' },
                { src: '//cdnmedia.endeavorsuite.com/images/organizations/64322193-6cef-4f8c-bb71-688c977b6511/traxstech/06.jpeg?v=20250116194556', title: 'Mounting Options', desc: 'You can mix and match the mounting options to configure your boat how you want to fish. We stock the rails from 6" to 72" and in traditional silver as well black colors.' },
                { src: '//cdnmedia.endeavorsuite.com/images/organizations/64322193-6cef-4f8c-bb71-688c977b6511/traxstech/07.jpeg?v=20250116194556', title: 'Options & Accessories', desc: 'We have a variety of other options and accessories to outfit your traxstech fishing system on your boat and make it the best set up it can be. Cup holders, tool kits, end caps, replacement screws, etc.' }
            ];
            
            let grid = '<div class="row" style="margin-top: 30px;">';
            images.forEach(img => {
                grid += `
                    <div class="col-xs-12 col-sm-6 col-md-4" style="margin-bottom: 30px;">
                        <img src="${img.src}" alt="${img.title}" style="max-width: 100%; height: auto; display: block; margin-bottom: 15px;" class="fr-fic fr-dii">
                        <h3 style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">${img.title}</h3>
                        <p style="font-size: 14px;">${img.desc}</p>
                    </div>
                `;
            });
            grid += '</div></div>';
            return grid;
        }
    );
    
    return processed;
}

// Make top two images side-by-side on Honda page
function processHondaOutboards(content) {
    // Replace the first ecomm_asset div that has the two images
    let processed = content.replace(
        /<div class="ecomm_asset"><div class="col-sm-6">.*?<\/div><div class="col-sm-6">.*?<\/div><\/div>/s,
        function(match) {
            return `<div class="ecomm_asset"><div class="row"><div class="col-xs-12 col-sm-6"><p><img src="//cdnmedia.endeavorsuite.com/images/ThumbGenerator/Thumb.aspx?img=//cdnmedia.endeavorsuite.com/images/organizations/64322193-6cef-4f8c-bb71-688c977b6511/Honda Outboards/HondaMarineCruiseSocial1080x1080.jpg&v=1753280392805&mw=400&mh=400&f=1?v=20250728181945" alt="HondaMarineCruiseSocial1080x1080" style="max-width: 100%; height: auto;" class="img-responsive center-block fr-fic fr-dib fr-fil"></p></div><div class="col-xs-12 col-sm-6"><p><img src="https://cdnmedia.endeavorsuite.com/images/organizations/64322193-6cef-4f8c-bb71-688c977b6511/Honda%20Outboards/CruiseIntoSummerPricingDiscounts.png?v=1752619714406" alt="Instant Savings" style="max-width: 100%; height: auto;" class="fr-fic fr-dib fr-fil center-block img-responsive"></p></div></div></div>`;
        }
    );
    
    return processed;
}

// Make images evenly sized and spaced on Yamaha page
function processYamahaOutboards(content) {
    // This will be handled by CSS in the component, but we can standardize image widths
    let processed = content.replace(
        /style="width:\s*\d+px;/g,
        'style="width: 250px;'
    );
    
    // Ensure images have proper spacing
    processed = processed.replace(
        /<img([^>]+)class="([^"]*)"([^>]*)>/g,
        '<img$1class="$2 img-responsive"$3 style="max-width: 100%; height: auto; margin-bottom: 20px;">'
    );
    
    return processed;
}

generatePages().catch(console.error);

