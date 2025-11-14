import Link from 'next/link'

export default function BannerV2() {
    return (
        <>
            <div className="widget-banner-v2">
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="tf-car-banner car-banner-style2">
                                <div className="group-content">
                                    <span className="sub-heading">Boat Inventory</span>
                                    <h3 className="heading-car">Browse Over <span className="text-red">100+</span> 
                                        Boats & Motors</h3>
                                    <div className="btn-read-more">
                                        <Link className="more-link" href="/#">
                                            <span>View Inventory</span>
                                            <i className="icon-arrow-right2" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="group-image">
                                    <img src="./assets/images/banner/ellips.png" alt="image car" className="ellips" />
                                    <img src="./assets/images/banner/18.png" alt="car01" className="car" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="tf-car-banner car-banner-style2">
                                <div className="group-content">
                                    <span className="sub-heading">Boat Inventory</span>
                                    <h3 className="heading-car">Looking To Sell Your <span className="text-red">Used</span>
                                        boat or motor? </h3>
                                    <div className="btn-read-more">
                                        <Link className="more-link" href="/#">
                                            <span>View Inventory</span>
                                            <i className="icon-arrow-right2" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="group-image">
                                    <img src="./assets/images/banner/ellips.png" alt="image car" className="ellips" />
                                    <img src="./assets/images/banner/c3.png" alt="car01" className="car-red" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
