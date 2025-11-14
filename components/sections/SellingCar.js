'use client'
import { useState } from 'react';
import Link from 'next/link'

export default function SellingCar() {
    const [activeItem, setActiveItem] = useState(null);

  const handleMouseOver = (index) => {
    setActiveItem(index);
  };
  
  const handleMouseLeave = () => {
    setActiveItem(null);
  };
    return (
        <>
            <div className="widget-selling-car">
                <div className="themesflat-container">
                    <div className="selling-car-wrap">
                        <div className="heading-section t-al-center mb-60">
                            <span className="sub-title mb-6 wow fadeInUp">Find your boat by brand</span>
                            <h2 className="title wow fadeInUp">Best Selling Boats</h2>
                        </div>
                        <div className="selling-car">
                            <div className="selling-carpart">
                                <div className="offer-bg">
                                    <div className="offer">
                                        <div className="offer-sale">New<span>Arrival</span></div>
                                    </div>
                                </div>
                                <div className="carpart">
                                    <img src="./assets/images/page/mast.png" alt="" className="mask" />
                                    <img src="/assets/images/inventory/13649233i/2026-kingfisher-boats-2025-esc-1-2025EscST.JPG" alt="2026 Kingfisher Boats 2025 Escape ST" className="car" />
                                </div>
                                <div className={`item-dot right ${1 === activeItem ? 'active' : ''}`} onMouseOver={() => handleMouseOver(1)} onMouseLeave={handleMouseLeave}>
                                    <Link href="/#">
                                        <div className="inner">
                                            <div className="group-title">
                                                <div className="title">
                                                    Canvas Soft Top
                                                </div>
                                            </div>
                                            <div className="description">
                                                <p>Canvas top with side curtains and windshield wipers</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className={`item-dot dot-1 right ${2 === activeItem ? 'active' : ''}`} onMouseOver={() => handleMouseOver(2)} onMouseLeave={handleMouseLeave}>
                                    <Link href="/#">
                                        <div className="inner">
                                            <div className="group-title">
                                                <div className="title">
                                                    Yamaha Power
                                                </div>
                                            </div>
                                            <div className="description">
                                                <p>225HP and 9.9HP Yamaha outboard engines</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className={`item-dot dot-2 ${3 === activeItem ? 'active' : ''}`} onMouseOver={() => handleMouseOver(3)} onMouseLeave={handleMouseLeave}>
                                    <Link href="/#">
                                        <div className="inner">
                                            <div className="group-title">
                                                <div className="title">
                                                    Rivermaster Seating
                                                </div>
                                            </div>
                                            <div className="description">
                                                <p>Two Rivermaster seats with Smooth Move suspension</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className={`item-dot dot-3 ${4 === activeItem ? 'active' : ''}`} onMouseOver={() => handleMouseOver(4)} onMouseLeave={handleMouseLeave}>
                                    <Link href="/#">
                                        <div className="inner">
                                            <div className="group-title">
                                                <div className="title">
                                                    Angler Package
                                                </div>
                                            </div>
                                            <div className="description">
                                                <p>Bow fish locker, storage seats, trim tabs & livewell</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="selling-content">
                                <span className="sub-selling">Coming Soon</span>
                                <h4 className="title-selling">2026 Kingfisher Boats 2025 Escape ST</h4>
                                <p className="des">The 2025 Escape Soft Top has been a huge hit in the Midwest since we started selling Kingfisher back in 2015. Canvas top with side curtains, windshield wipers, 2 auto bilge pumps, swim platform and many other great features.
                                </p>
                                <div className="price-selling">
                                    <span className="price-sale">Contact for Price</span>
                                </div>
                                <div className="parameter">
                                    <ul>
                                        <li className="listing-information fuel">
                                            <i className="icon-gasoline-pump-1" />
                                            <div className="inner">
                                                <span>Engine</span>
                                                <p>Yamaha 225HP</p>
                                            </div>
                                        </li>
                                        <li className="listing-information size-engine">
                                            <i className="icon-Group1" />
                                            <div className="inner">
                                                <span>Brand</span>
                                                <p>Kingfisher</p>
                                            </div>
                                        </li>
                                        <li className="listing-information transmission">
                                            <i className="icon-gearbox-1" />
                                            <div className="inner">
                                                <span>Type</span>
                                                <p>Escape ST</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="btn-main">
                                    <Link href="/inventory/2026-kingfisher-boats-2025-escape-st-13649233i" className="button_main_inner">
                                        <span>View Details</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
