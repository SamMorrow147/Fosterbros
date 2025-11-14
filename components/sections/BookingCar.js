
import Link from 'next/link'
import CounterUp from '../elements/CounterUp'

export default function BookingCar() {
    return (
        <>
            <div className="widget-booking-car">
                <div className="themesflat-container">
                    <div className="booking-car">
                        <div className="header-section">
                            <div className="heading-section">
                                <span className="sub-title mb-6 wow fadeInUp">QUALITY BOATS & MARINE EQUIPMENT</span>
                                <h2 className="title wow fadeInUp">We're Your Trusted <span className="text-red">Marine Dealer</span></h2>
                            </div>
                            <p className="description wow fadeInUp">For years, we've been raising the standard of marine
                                sales and service with one
                                of the
                                most innovative and reliable marine programmes ever created.
                                A comprehensive range of boats, motors, and accessories.
                            </p>
                        </div>
                        <div className="brand-car">
                            <div className="w-470">
                                <div className="box-icon-list-v2">
                                    <Link href="/inventory?brand=Skeeter" className="icon-box v2-box">
                                        <div className="image-box-wrap">
                                            <img src="/assets/images/partner/1.png" alt="Skeeter" />
                                        </div>
                                        <span className="title-icon">Skeeter</span>
                                        <div className="btn-con-box">
                                            <i className="icon-arrow-right2" />
                                        </div>
                                    </Link>
                                    <Link href="/inventory?brand=Starcraft" className="icon-box v2-box">
                                        <div className="image-box-wrap">
                                            <img src="/assets/images/partner/2.png" alt="Starcraft" />
                                        </div>
                                        <span className="title-icon">Starcraft</span>
                                        <div className="btn-con-box">
                                            <i className="icon-arrow-right2" />
                                        </div>
                                    </Link>
                                    <Link href="/inventory?brand=Kingfisher" className="icon-box v2-box">
                                        <div className="image-box-wrap">
                                            <img src="/assets/images/partner/3.png" alt="Kingfisher" />
                                        </div>
                                        <span className="title-icon">Kingfisher</span>
                                        <div className="btn-con-box">
                                            <i className="icon-arrow-right2" />
                                        </div>
                                    </Link>
                                    <Link href="/inventory?brand=Manitou" className="icon-box v2-box">
                                        <div className="image-box-wrap">
                                            <img src="/assets/images/partner/4.png" alt="Manitou" />
                                        </div>
                                        <span className="title-icon">Manitou</span>
                                        <div className="btn-con-box">
                                            <i className="icon-arrow-right2" />
                                        </div>
                                    </Link>
                                    <Link href="/inventory?brand=Yamaha" className="icon-box v2-box">
                                        <div className="image-box-wrap">
                                            <img src="/assets/images/partner/5.png" alt="Yamaha" />
                                        </div>
                                        <span className="title-icon">Yamaha</span>
                                        <div className="btn-con-box">
                                            <i className="icon-arrow-right2" />
                                        </div>
                                    </Link>
                                    <Link href="/inventory?brand=Honda" className="icon-box v2-box">
                                        <div className="image-box-wrap">
                                            <img src="/assets/images/partner/6.png" alt="Honda Marine" />
                                        </div>
                                        <span className="title-icon">Honda Marine</span>
                                        <div className="btn-con-box">
                                            <i className="icon-arrow-right2" />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="brand-counter">
                                <div className="counter tf-counter">
                                    <div className="widget-counter counter-v2">
                                        <div className="number-counter number" data-to={20} data-speed={2000} data-waypoint-active="yes"><CounterUp count={20} /></div>
                                        <p>Skilled Speakers</p>
                                    </div>
                                    <div className="widget-counter counter-v2">
                                        <div className="number-counter number" data-to={12} data-speed={2000} data-waypoint-active="yes">
                                            <CounterUp count={12} /><span>k</span></div>
                                        <p>Active Customers</p>
                                    </div>
                                    <div className="widget-counter counter-v2">
                                        <div className="number-counter number" data-to={15} data-speed={2000} data-waypoint-active="yes"><CounterUp count={15} /></div>
                                        <p>Open Showroom</p>
                                    </div>
                                </div>
                                <div className="brand-image">
                                    <img src="./assets/images/page/car2.png" alt="" />
                                    <div className="car-box tf-counter">
                                        <span className="number" data-to={25} data-speed={2000} data-waypoint-active="yes"><CounterUp count={25} /></span>
                                        <p className="experience">year of experience</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
