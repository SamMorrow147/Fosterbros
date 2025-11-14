import Link from "next/link"
export default function Footer1() {
    return (
        <>
            <footer id="footer" className="clearfix bg-footer2 pd-t81 re-hi">
                <div className="themesflat-container">
                    <div className="row footer-top">
                        <div className="col-lg-6 col-md-12 col-12 pd-r80 ">
                            <h2 className="title-footer-top">Do you Have a <span className="red-title">boat or motor</span> to sell
                                through us?</h2>
                            {/* <img className="icon-ft" src="/assets/images/page/shape-footer.png" alt="" /> */}
                        </div>
                        <div className="col-lg-6 col-md-12 col-12 t-al-right pt-20">
                            <Link href="/#" className="btn-sell">Sell your boat today</Link>
                        </div>
                    </div>
                    <div className="row footer-main">
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="widget widget-info">
                                <img src="/logo.png" alt="Foster Bros Marine" />
                                <p>Your trusted marine dealer in Delano, Minnesota. Offering premium boats, pontoons, 
                                    outboard motors, and trailers from top brands.</p>
                                <ul>
                                    <li>
                                        <i className="icon-Vector1" />
                                        <p>14 New South Head Rd,Triple 3148London, UK</p>
                                    </li>
                                    <li>
                                        <i className="icon-Group-1" />
                                        <p>needhelp@company.com</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="widget widget-menu pl-60">
                                <h3>Quick Links</h3>
                                <ul className="box-menu">
                                    <li><Link href="/inventory?availability=In Stock">Current Inventory</Link></li>
                                    <li><Link href="/brands">Boat Brands</Link></li>
                                    <li><Link href="/inventory?type=Outboard Motors&availability=In Stock">Outboards</Link></li>
                                    <li><Link href="/products">Products</Link></li>
                                    <li><Link href="/service">Service</Link></li>
                                    <li><Link href="/contact-us">Contact Us</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="widget widget-menu pl-30">
                                <h3>Company</h3>
                                <ul className="box-menu">
                                    <li><Link href="/about">About Us</Link></li>
                                    <li><Link href="/blog">Blog</Link></li>
                                    <li><Link href="/events">Events</Link></li>
                                    <li><Link href="/financing">Financing</Link></li>
                                    <li><Link href="/annual-water-demo">Annual Water Demo</Link></li>
                                    <li><Link href="/careers">Careers</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="widget widget-menu widget-form">
                                <h3>Newsletter</h3>
                                <form method="post" className="email-footer-form form-submit" action="#" acceptCharset="utf-8">
                                    <div className="text-wrap clearfix">
                                        <fieldset className="email-wrap style-text">
                                            <input type="email" className="tb-my-input" name="email" placeholder="Enter Email Adress" required />
                                        </fieldset>
                                        <button name="submit" type="submit" className="btn-submit-email">
                                            <i className="icon-Group" />
                                        </button>
                                    </div>
                                    <div className="tfad-listing-feature">
                                        <div className="radio">
                                            <input id="front" type="checkbox" name="check" defaultValue="check" />
                                            <label htmlFor="front" className="text-white">I agree to all your terms and
                                                policies</label>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="row footer-bottom">
                        <div className="col-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4">
                            <p className="coppy-right">© {new Date().getFullYear()} Foster Bros Marine. All rights reserved.</p>
                        </div>
                        <div className="col-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4">
                            <ul className="social-icon">
                                <li>
                                    <Link href="/#"><i className="icon-6" /></Link>
                                </li>
                                <li>
                                    <Link href="/#"><i className="icon-4" /></Link>
                                </li>
                                <li>
                                    <Link href="/#"><i className="icon-5" /></Link>
                                </li>
                                <li>
                                    <Link href="/#"><i className="icon-7" /></Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-12 col-lg-12 col-xl-4 col-xxl-4">
                            <ul className="bottom-bar-menu">
                                <li><Link href="/#">Privacy &amp; Policy</Link></li>
                                <li><Link href="/#">Licensing</Link></li>
                                <li><Link href="/#">Instruction</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    )
}
