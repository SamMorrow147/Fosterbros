'use client'
import Link from 'next/link'
import VideoPopup from '../elements/VideoPopup'

export default function Slide() {
    return (
        <>
            <div className="widget-tf-slider ">
                <div className="slider-wrap swiper-wrapper">
                    <div className="tf-slide-item swiper-slide">
                        <div className="slide-item-image">
                            <img src="/winterization.png" alt="Winterization and Storage" />
                            <div className="overlay" />
                        </div>
                        <div className="slide-item-content">
                            <div className="slide-content">
                                <span className="wow fadeInUp sub-title" data-wow-delay="100ms" data-wow-duration="2000ms">Trusted Marine Dealer</span>
                                <h1 className=" title-slide wow slideInUp" data-wow-delay="50ms" data-wow-duration="200ms">
                                    WINTERIZATION AND STORAGE<br />AVAILABLE</h1>
                                <p className="description wow fadeInUp" data-wow-delay="300ms" data-wow-duration="2000ms">
                                    Foster Bros Marine is where water enthusiasts find the finest 
                                    boats, pontoons, and motors before they hit the water.</p>
                                <div className="box">
                                    <div className="btn-main">
                                        <Link href="/inventory" className="button_main_inner">
                                            <span>View Inventory</span>
                                        </Link>
                                    </div>
                                    {/* <div className="video-wrap">
                                        <VideoPopup style={2} />
                                    </div> */}
                                </div>
                            </div>
                            <div className="box">
                                <span>+1 (763) 972-3199</span>
                                <span>Contact@gmail.com</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
