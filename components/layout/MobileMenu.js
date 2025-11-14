'use client'
import Link from "next/link"
import { useState } from "react"

export default function MobileMenu() {
    const [isActive, setIsActive] = useState({
        status: false,
        key: "",
    })

    const handleToggle = (key) => {
        if (isActive.key === key) {
            setIsActive({
                status: false,
            })
        } else {
            setIsActive({
                status: true,
                key,
            })
        }
    }

    return (
        <>
            <ul className="navigation clearfix">
                <li><Link href="/">Home</Link></li>
                
                <li className={isActive.key == 1 ? "dropdown2 current" : "dropdown2"}>
                    <Link href="/inventory?availability=In Stock">Current Inventory</Link>
                    <ul style={{ display: `${isActive.key == 1 ? "block" : "none"}` }}>
                        <li><Link href="/inventory">All Inventory</Link></li>
                        <li><Link href="/inventory?availability=In Stock&type=Outboard Motors">Outboard Inventory</Link></li>
                    </ul>
                    <div className={isActive.key == 1 ? "dropdown2-btn open" : "dropdown2-btn"} onClick={() => handleToggle(1)}>
                        <span className="fa fa-angle-right" />
                    </div>
                </li>

                <li className={isActive.key == 2 ? "dropdown2 current" : "dropdown2"}>
                    <Link href="/brands">Boat Brands</Link>
                    <ul style={{ display: `${isActive.key == 2 ? "block" : "none"}` }}>
                        <li><Link href="/factory-promotions">Factory Promotions</Link></li>
                        <li><Link href="/inventory/brand/Starcraft">Starcraft Pontoons</Link></li>
                        <li><Link href="/inventory/brand/Kingfisher">Kingfisher Boats</Link></li>
                        <li><Link href="/inventory/brand/Skeeter">Skeeter</Link></li>
                        <li><Link href="/inventory/brand/SeaArk">SeaArk</Link></li>
                        <li><Link href="/bass-cat">Bass Cat</Link></li>
                        <li><Link href="/inventory/brand/Yar-Craft">Yar-Craft</Link></li>
                    </ul>
                    <div className={isActive.key == 2 ? "dropdown2-btn open" : "dropdown2-btn"} onClick={() => handleToggle(2)}>
                        <span className="fa fa-angle-right" />
                    </div>
                </li>

                <li className={isActive.key == 3 ? "dropdown2 current" : "dropdown2"}>
                    <Link href="/products">Products</Link>
                    <ul style={{ display: `${isActive.key == 3 ? "block" : "none"}` }}>
                        <li><Link href="/inventory/type/Trailers">Trailers</Link></li>
                        <li><Link href="/paddleboats">Paddleboats</Link></li>
                        <li><Link href="/ultralegs">Ultra Legs</Link></li>
                        <li><Link href="/traxstech">Traxstech</Link></li>
                    </ul>
                    <div className={isActive.key == 3 ? "dropdown2-btn open" : "dropdown2-btn"} onClick={() => handleToggle(3)}>
                        <span className="fa fa-angle-right" />
                    </div>
                </li>

                <li className={isActive.key == 4 ? "dropdown2 current" : "dropdown2"}>
                    <Link href="/inventory?type=Outboard Motors&availability=In Stock">Outboards</Link>
                    <ul style={{ display: `${isActive.key == 4 ? "block" : "none"}` }}>
                        <li><Link href="/hondaoutboards">Honda</Link></li>
                        <li><Link href="/inventory?availability=In Stock">Mercury</Link></li>
                        <li><Link href="/yamahaoutboards">Yamaha Outboards</Link></li>
                    </ul>
                    <div className={isActive.key == 4 ? "dropdown2-btn open" : "dropdown2-btn"} onClick={() => handleToggle(4)}>
                        <span className="fa fa-angle-right" />
                    </div>
                </li>

                <li className={isActive.key == 5 ? "dropdown2 current" : "dropdown2"}>
                    <Link href="/service">Service</Link>
                    <ul style={{ display: `${isActive.key == 5 ? "block" : "none"}` }}>
                        <li><Link href="/service-request">Service Request</Link></li>
                        <li><Link href="/winterization-storage">Winterization & Storage</Link></li>
                        <li><Link href="/winterize-liability-form">Winter Storage/Winterize Liability Form</Link></li>
                        <li><Link href="/pontoon-trailer-rentals">Pontoon Trailer Rentals</Link></li>
                    </ul>
                    <div className={isActive.key == 5 ? "dropdown2-btn open" : "dropdown2-btn"} onClick={() => handleToggle(5)}>
                        <span className="fa fa-angle-right" />
                    </div>
                </li>

                <li className={isActive.key == 6 ? "dropdown2 current" : "dropdown2"}>
                    <Link href="/company">Company Info</Link>
                    <ul style={{ display: `${isActive.key == 6 ? "block" : "none"}` }}>
                        <li><Link href="/about">About Us</Link></li>
                        <li><Link href="/blog">Blog</Link></li>
                        <li><Link href="/events">Events List</Link></li>
                        <li><Link href="/financing">Financing</Link></li>
                        <li><Link href="/annual-water-demo">Annual Water Demo</Link></li>
                        <li><Link href="/careers">Careers</Link></li>
                    </ul>
                    <div className={isActive.key == 6 ? "dropdown2-btn open" : "dropdown2-btn"} onClick={() => handleToggle(6)}>
                        <span className="fa fa-angle-right" />
                    </div>
                </li>
            </ul>
        </>
    )
}
