'use client'
import Link from 'next/link'

export default function QuickLinks() {
    return (
        <>
            <div className="quick-links-section" style={{
                padding: '60px 0',
                background: '#f8f9fa'
            }}>
                <div className="themesflat-container">
                    <div className="row">
                        {/* New Inventory */}
                        <div className="col-lg-4 col-md-4 mb-4">
                            <div className="quick-link-card" style={{
                                position: 'relative',
                                height: '350px',
                                borderRadius: '15px',
                                overflow: 'hidden',
                                backgroundImage: 'url(/assets/images/inventory/12985484i/2026-kingfisher-boats-25-xac-1-IMG_4028.JPG)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                display: 'flex',
                                alignItems: 'flex-end',
                                padding: '40px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                                transition: 'transform 0.3s ease'
                            }}>
                                {/* Dark Overlay */}
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)',
                                    zIndex: 1
                                }} />
                                
                                {/* Content */}
                                <div style={{ position: 'relative', zIndex: 2 }}>
                                    <h2 style={{
                                        color: 'white',
                                        fontSize: '32px',
                                        fontWeight: 'bold',
                                        marginBottom: '20px',
                                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                                    }}>NEW INVENTORY</h2>
                                    <Link href="/inventory?usage=New" className="button_main_inner" style={{
                                        background: '#ffc107',
                                        color: '#000',
                                        padding: '12px 30px',
                                        borderRadius: '5px',
                                        textDecoration: 'none',
                                        display: 'inline-block',
                                        fontWeight: '600',
                                        transition: 'background 0.3s ease'
                                    }}>
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Pre-Owned */}
                        <div className="col-lg-4 col-md-4 mb-4">
                            <div className="quick-link-card" style={{
                                position: 'relative',
                                height: '350px',
                                borderRadius: '15px',
                                overflow: 'hidden',
                                backgroundImage: 'url(/assets/images/inventory/13365748i/2025-yar-craft-219-tfx-dealer--1-IMG_3899.JPG)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                display: 'flex',
                                alignItems: 'flex-end',
                                padding: '40px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                                transition: 'transform 0.3s ease'
                            }}>
                                {/* Dark Overlay */}
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)',
                                    zIndex: 1
                                }} />
                                
                                {/* Content */}
                                <div style={{ position: 'relative', zIndex: 2 }}>
                                    <h2 style={{
                                        color: 'white',
                                        fontSize: '32px',
                                        fontWeight: 'bold',
                                        marginBottom: '20px',
                                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                                    }}>PRE-OWNED</h2>
                                    <Link href="/inventory?usage=Used" className="button_main_inner" style={{
                                        background: '#ffc107',
                                        color: '#000',
                                        padding: '12px 30px',
                                        borderRadius: '5px',
                                        textDecoration: 'none',
                                        display: 'inline-block',
                                        fontWeight: '600',
                                        transition: 'background 0.3s ease'
                                    }}>
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Our Services */}
                        <div className="col-lg-4 col-md-4 mb-4">
                            <div className="quick-link-card" style={{
                                position: 'relative',
                                height: '350px',
                                borderRadius: '15px',
                                overflow: 'hidden',
                                backgroundImage: 'url(/assets/images/inventory/12941786i/2025-seaark-predator-300-ak-je-1-IMG_7646.JPG)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                display: 'flex',
                                alignItems: 'flex-end',
                                padding: '40px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                                transition: 'transform 0.3s ease'
                            }}>
                                {/* Dark Overlay */}
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)',
                                    zIndex: 1
                                }} />
                                
                                {/* Content */}
                                <div style={{ position: 'relative', zIndex: 2 }}>
                                    <h2 style={{
                                        color: 'white',
                                        fontSize: '32px',
                                        fontWeight: 'bold',
                                        marginBottom: '20px',
                                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                                    }}>OUR SERVICES</h2>
                                    <Link href="/service" className="button_main_inner" style={{
                                        background: '#ffc107',
                                        color: '#000',
                                        padding: '12px 30px',
                                        borderRadius: '5px',
                                        textDecoration: 'none',
                                        display: 'inline-block',
                                        fontWeight: '600',
                                        transition: 'background 0.3s ease'
                                    }}>
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .quick-link-card:hover {
                    transform: translateY(-5px);
                }
                
                @media (max-width: 991px) {
                    .row {
                        flex-direction: column;
                    }
                    .col-lg-4 {
                        width: 100%;
                        margin-bottom: 20px;
                    }
                }
            `}</style>
        </>
    )
}

