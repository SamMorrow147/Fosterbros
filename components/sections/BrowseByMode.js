
import Link from 'next/link'

export default function BrowseByMode() {
    return (
        <>
            <div className="widget-browse-by-mode">
                <div className="themesflat-container">
                    <div className="browse-by-mode">
                        <div className="heading-section">
                            <span className="sub-title mb-6 wow fadeInUp">Trusted Marine Dealer Service</span>
                            <h2 className="title mb-40 wow fadeInUp">Browse By Brand</h2>
                            <p className="description wow fadeInUp">For over 15 years, we've been raising the standard of marine
                                retailing with one of the most innovative and reliable
                                boat and motor programs in Minnesota.
                            </p>
                            <div className="btn-main mt-40 wow fadeInUp">
                                <Link href="/inventory" className="button_main_inner">
                                    <span>View All Listings</span>
                                </Link>
                            </div>
                        </div>
                        <div className="w-722">
                            <div className="box-icon-list">
                                <Link href="/inventory/brand/Starcraft" className="icon-box v1-box">
                                    <div className="image-box-wrap">
                                        <img src="/Brand Logos/starcraft-logo-black-and-white.png" alt="Starcraft" />
                                    </div>
                                    <span className="title-icon">Starcraft</span>
                                    <div className="btn-con-box">
                                        <i className="icon-arrow-right2" />
                                    </div>
                                </Link>
                                <Link href="/inventory/brand/Kingfisher" className="icon-box v1-box">
                                    <div className="image-box-wrap">
                                        <img src="/Brand Logos/kingfisher-logo-l.png" alt="Kingfisher" />
                                    </div>
                                    <span className="title-icon">Kingfisher</span>
                                    <div className="btn-con-box">
                                        <i className="icon-arrow-right2" />
                                    </div>
                                </Link>
                                <Link href="/inventory/brand/Skeeter" className="icon-box v1-box">
                                    <div className="image-box-wrap">
                                        <img src="/Brand Logos/Skeeter.png" alt="Skeeter" />
                                    </div>
                                    <span className="title-icon">Skeeter</span>
                                    <div className="btn-con-box">
                                        <i className="icon-arrow-right2" />
                                    </div>
                                </Link>
                                <Link href="/inventory/brand/Manitou" className="icon-box v1-box">
                                    <div className="image-box-wrap">
                                        <img src="/Brand Logos/manitou-pontoon-boats-logo-vector.png" alt="Manitou" />
                                    </div>
                                    <span className="title-icon">Manitou</span>
                                    <div className="btn-con-box">
                                        <i className="icon-arrow-right2" />
                                    </div>
                                </Link>
                                <Link href="/inventory/brand/Yamaha" className="icon-box v1-box">
                                    <div className="image-box-wrap">
                                        <img src="/Brand Logos/yamaha-rightwaters-2021-coalition-conservation-news-2.webp" alt="Yamaha" />
                                    </div>
                                    <span className="title-icon">Yamaha</span>
                                    <div className="btn-con-box">
                                        <i className="icon-arrow-right2" />
                                    </div>
                                </Link>
                                <Link href="/inventory/brand/Honda" className="icon-box v1-box">
                                    <div className="image-box-wrap">
                                        <img src="/Brand Logos/Honda_Marine_logo.svg.png" alt="Honda Marine" />
                                    </div>
                                    <span className="title-icon">Honda Marine</span>
                                    <div className="btn-con-box">
                                        <i className="icon-arrow-right2" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
