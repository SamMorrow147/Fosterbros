import Layout from "@/components/layout/Layout"
import Link from "next/link"

export default function Outboards() {
    return (
        <Layout headerStyle={3} footerStyle={1} breadcrumbTitle="Outboards">
            <div className="themesflat-container">
                <div className="row">
                    <div className="col-12">
                        <div className="content-page" style={{ padding: '80px 0' }}>
                            <h1>Outboards</h1>
                            <p>Browse our selection of outboard motors:</p>
                            <ul style={{ listStyle: 'none', padding: '20px 0' }}>
                                <li style={{ marginBottom: '10px' }}><Link href="/hondaoutboards" style={{ fontSize: '18px' }}>Honda Outboards</Link></li>
                                <li style={{ marginBottom: '10px' }}><Link href="/inventory?availability=In Stock" style={{ fontSize: '18px' }}>Mercury Outboards</Link></li>
                                <li style={{ marginBottom: '10px' }}><Link href="/yamahaoutboards" style={{ fontSize: '18px' }}>Yamaha Outboards</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

