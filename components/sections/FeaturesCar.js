
import Link from 'next/link'
import VideoPopup from '../elements/VideoPopup'

export default function FeaturesCar() {
    return (
        <>
            <div className="widget-feature-car">
                <div className="themesflat-container full">
                    <div className="feature-car">
                        <div className="feature-car-content">
                            <div className="heading-section">
                                <span className="sub-title mb-6 wow fadeInUp">Trusted Marine Dealer Service</span>
                                <h2 className="title mb-40 wow fadeInUp">Frequently Asked Questions</h2>
                                <p className="description wow fadeInUp">For over 15 years, we've been raising the standard of marine
                                    retailing with one of the most innovative and reliable
                                    boat and motor programs in Minnesota.
                                </p>
                            </div>
                            <div className="list-icon-check">
                                <ul>
                                    <li>
                                        <i className="icon-Vector-32" />
                                        <p>We are the best marine dealer with exceptional service</p>
                                    </li>
                                    <li>
                                        <i className="icon-Vector-32" />
                                        <p>Get the best servicing for boats, motors &amp; marine equipment</p>
                                    </li>
                                    <li>
                                        <i className="icon-Vector-32" />
                                        <p>Expert technicians for maintenance and servicing</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="btn-main">
                                <Link href="/#" className="button_main_inner">
                                    <span>Get started</span>
                                </Link>
                            </div>
                        </div>
                        <div className="feature-car-video video-wrap">
                            <img src="./assets/images/page/video.jpg" alt="" />
                            <VideoPopup style={1}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
