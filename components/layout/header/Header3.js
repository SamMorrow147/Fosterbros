import Link from "next/link"
import Menu from "../Menu"
import MobileMenu from "../MobileMenu"
export default function Header3({ scroll, isMobileMenu, handleMobileMenu, handleToggle1, isToggled1, handleToggle2, isToggled2, handleToggle3, isToggled3 }) {
    return (
        <>
            <header id="header3" className="main-header header header-fixed ">
                {/* Header Lower */}
                <div className="top-bar">
                    <div className="themesflat-container">
                        <div className="row" style={{ alignItems: 'center' }}>
                            <div className="col-md-9">
                                <ul className="list-infor-topbar" style={{ whiteSpace: 'nowrap', flexWrap: 'nowrap' }}>
                                    <li>
                                        <a href="tel:+17639723199">
                                            <i className="icon-Group-11" />
                                            <p>Phone: (763) 972-3199</p>
                                        </a>
                                    </li>
                                    <li>
                                        <Link href="/#">
                                            <i className="icon-Group3" />
                                            <p>Mail Us: your_protect@mail.com</p>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-3">
                                <ul className="icon-topbar">
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
                        </div>
                    </div>
                </div>
                <div className="header-lower">
                    <div className="themesflat-container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="header-style2 flex align-center" style={{ width: '100%' }}>
                                    {/* Logo Box */}
                                    <div className="logo-box flex">
                                        <div className="logo"><Link href="/"><img src="/assets/images/logo/logo2@.png" alt="Foster Bros Marine" style={{ maxHeight: '80px', width: 'auto' }} /></Link></div>
                                    </div>
                                    <div className="nav-outer flex align-center" style={{ flex: 1 }}>
                                        {/* Main Menu */}
                                        <nav className="main-menu show navbar-expand-md">
                                            <div className="navbar-collapse collapse clearfix" id="navbarSupportedContent">
                                                <Menu />
                                            </div>
                                        </nav>
                                        {/* Main Menu End*/}
                                    </div>
                                    <div className="mobile-nav-toggler mobile-button" onClick={handleMobileMenu}>
                                        <span />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Header Lower */}
                {/* Mobile Menu  */}
                <div className="close-btn" onClick={handleMobileMenu}><span className="icon flaticon-cancel-1" /></div>
                <div className="mobile-menu">
                    <div className="menu-backdrop" onClick={handleMobileMenu} />
                    <nav className="menu-box">
                        <div className="nav-logo">
                            <Link href="/"><img src="/logo.png" alt="Foster Bros Marine" /></Link>
                        </div>
                        <div className="bottom-canvas">
                            <div className="menu-outer">
                                <MobileMenu />
                            </div>
                            <div className="help-bar-mobie login-box">
                                <a data-bs-toggle="modal" onClick={handleToggle1} role="button" className="fw-7 category"><i className="icon-user" />Login</a>
                            </div>
                            <div className="help-bar-mobie search">
                                <Link href="/#" className="fw-7 font-2"><i className="icon-loupe-1" />Search</Link>
                            </div>
                            <div className="help-bar-mobie compare">
                                <Link href="/#" className="fw-7 font-2"><i className="icon-shuffle-2-1" />Compare</Link>
                            </div>
                            <div className="help-bar-mobie cart">
                                <Link href="/#" className="fw-7 font-2"><i className="icon-Vector" />Cart</Link>
                            </div>
                        </div>
                    </nav>
                </div>
                {/* End Mobile Menu */}
            </header>

        </>
    )
}
