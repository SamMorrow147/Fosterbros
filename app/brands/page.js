import Layout from "@/components/layout/Layout"
import Link from "next/link"

export default function Brands() {
    return (
        <Layout headerStyle={3} footerStyle={1} breadcrumbTitle="Boat Brands">
            <div className="themesflat-container">
                <div className="row">
                    <div className="col-12">
                        <div className="content-page" style={{ padding: '80px 0' }}>
                            <h1>Boat Brands</h1>
                            <p>Explore our selection of top boat brands:</p>
                            <ul style={{ listStyle: 'none', padding: '20px 0' }}>
                                <li style={{ marginBottom: '10px' }}><Link href="/factory-promotions" style={{ fontSize: '18px' }}>Factory Promotions</Link></li>
                                <li style={{ marginBottom: '10px' }}><Link href="/inventory/brand/Starcraft" style={{ fontSize: '18px' }}>Starcraft Pontoons</Link></li>
                                <li style={{ marginBottom: '10px' }}><Link href="/inventory/brand/Kingfisher" style={{ fontSize: '18px' }}>Kingfisher Boats</Link></li>
                                <li style={{ marginBottom: '10px' }}><Link href="/inventory/brand/Skeeter" style={{ fontSize: '18px' }}>Skeeter</Link></li>
                                <li style={{ marginBottom: '10px' }}><Link href="/inventory/brand/SeaArk" style={{ fontSize: '18px' }}>SeaArk</Link></li>
                                <li style={{ marginBottom: '10px' }}><Link href="/bass-cat" style={{ fontSize: '18px' }}>Bass Cat</Link></li>
                                <li style={{ marginBottom: '10px' }}><Link href="/inventory/brand/Yar-Craft" style={{ fontSize: '18px' }}>Yar-Craft</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}


