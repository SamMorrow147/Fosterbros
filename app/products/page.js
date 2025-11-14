import Layout from "@/components/layout/Layout"
import Link from "next/link"

export default function Products() {
    return (
        <Layout headerStyle={3} footerStyle={1} breadcrumbTitle="Products">
            <div className="themesflat-container">
                <div className="row">
                    <div className="col-12">
                        <div className="content-page" style={{ padding: '80px 0' }}>
                            <h1>Products</h1>
                            <p>Browse our range of marine products and accessories:</p>
                            <ul style={{ listStyle: 'none', padding: '20px 0' }}>
                                <li style={{ marginBottom: '10px' }}><Link href="/inventory/type/Trailers" style={{ fontSize: '18px' }}>Trailers</Link></li>
                                <li style={{ marginBottom: '10px' }}><Link href="/paddleboats" style={{ fontSize: '18px' }}>Paddleboats</Link></li>
                                <li style={{ marginBottom: '10px' }}><Link href="/ultralegs" style={{ fontSize: '18px' }}>Ultra Legs</Link></li>
                                <li style={{ marginBottom: '10px' }}><Link href="/traxstech" style={{ fontSize: '18px' }}>Traxstech</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

