
import Link from 'next/link'

export default function IconBox() {
    return (
        <>
            <div className="widget-icon-box" style={{ marginTop: '-60px' }}>
                <div className="themesflat-container">
                    <div className="heading-section t-al-center mb-30">
                        <span className="sub-title mb-6 wow fadeInUp">Find Your Boat by Brand</span>
                        <h2 className="title wow fadeInUp">Browse by Brand</h2>
                    </div>
                    <div className="row">
                        <div className="col-6 col-md-4 col-lg-4 col-xl-2">
                            <Link href="/inventory?brand=Skeeter" className="icon-box border-line">
                                <div className="image-box-wrap">
                                    <img src="/Brand Logos/Skeeter.png" alt="Skeeter" style={{ height: '70px', width: 'auto', objectFit: 'contain' }} />
                                </div>
                                <span className="title-icon">Skeeter</span>
                                <div className="btn-con-box">
                                    <i className="icon-arrow-right2" />
                                </div>
                            </Link>
                        </div>
                        <div className="col-6 col-md-4 col-lg-4 col-xl-2">
                            <Link href="/inventory?brand=Starcraft" className="icon-box border-line">
                                <div className="image-box-wrap">
                                    <img src="/Brand Logos/starcraft-logo-black-and-white.png" alt="Starcraft" style={{ height: '70px', width: 'auto', objectFit: 'contain' }} />
                                </div>
                                <span className="title-icon">Starcraft</span>
                                <div className="btn-con-box">
                                    <i className="icon-arrow-right2" />
                                </div>
                            </Link>
                        </div>
                        <div className="col-6 col-md-4 col-lg-4 col-xl-2">
                            <Link href="/inventory?brand=Kingfisher" className="icon-box border-line">
                                <div className="image-box-wrap">
                                    <img src="/Brand Logos/kingfisher-logo-l.png" alt="Kingfisher" style={{ height: '35px', width: 'auto', objectFit: 'contain' }} />
                                </div>
                                <span className="title-icon">Kingfisher</span>
                                <div className="btn-con-box">
                                    <i className="icon-arrow-right2" />
                                </div>
                            </Link>
                        </div>
                        <div className="col-6 col-md-4 col-lg-4 col-xl-2">
                            <Link href="/inventory?brand=Manitou" className="icon-box border-line">
                                <div className="image-box-wrap">
                                    <img src="/Brand Logos/manitou-pontoon-boats-logo-vector.png" alt="Manitou" style={{ height: '50px', width: 'auto', objectFit: 'contain' }} />
                                </div>
                                <span className="title-icon">Manitou</span>
                                <div className="btn-con-box">
                                    <i className="icon-arrow-right2" />
                                </div>
                            </Link>
                        </div>
                        <div className="col-6 col-md-4 col-lg-4 col-xl-2">
                            <Link href="/inventory?brand=Yamaha" className="icon-box border-line">
                                <div className="image-box-wrap">
                                    <img src="/Brand Logos/yamaha-rightwaters-2021-coalition-conservation-news-2.webp" alt="Yamaha" style={{ height: '50px', width: 'auto', objectFit: 'contain' }} />
                                </div>
                                <span className="title-icon">Yamaha</span>
                                <div className="btn-con-box">
                                    <i className="icon-arrow-right2" />
                                </div>
                            </Link>
                        </div>
                        <div className="col-6 col-md-4 col-lg-4 col-xl-2">
                            <Link href="/inventory?brand=Honda" className="icon-box border-line">
                                <div className="image-box-wrap">
                                    <img src="/Brand Logos/Honda_Marine_logo.svg.png" alt="Honda Marine" style={{ height: '50px', width: 'auto', objectFit: 'contain' }} />
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
        </>
    )
}
