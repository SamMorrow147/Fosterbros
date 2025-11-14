import Link from "next/link"

export default function Menu() {
    return (
        <>
            <ul className="navigation clearfix">
                <li><Link href="/">Home</Link></li>
                
                <li className="dropdown2">
                    <Link href="/inventory?availability=In Stock">Current Inventory</Link>
                    <ul>
                        <li><Link href="/inventory">All Inventory</Link></li>
                        <li><Link href="/inventory?availability=In Stock&type=Outboard Motors">Outboard Inventory</Link></li>
                    </ul>
                </li>

                <li className="dropdown2">
                    <Link href="/brands">Boat Brands</Link>
                    <ul>
                        <li><Link href="/factory-promotions">Factory Promotions</Link></li>
                        <li><Link href="/inventory/brand/Starcraft">Starcraft Pontoons</Link></li>
                        <li><Link href="/inventory/brand/Kingfisher">Kingfisher Boats</Link></li>
                        <li><Link href="/inventory/brand/Skeeter">Skeeter</Link></li>
                        <li><Link href="/inventory/brand/SeaArk">SeaArk</Link></li>
                        <li><Link href="/bass-cat">Bass Cat</Link></li>
                        <li><Link href="/inventory/brand/Yar-Craft">Yar-Craft</Link></li>
                    </ul>
                </li>

                <li className="dropdown2">
                    <Link href="/products">Products</Link>
                    <ul>
                        <li><Link href="/inventory/type/Trailers">Trailers</Link></li>
                        <li><Link href="/paddleboats">Paddleboats</Link></li>
                        <li><Link href="/ultralegs">Ultra Legs</Link></li>
                        <li><Link href="/traxstech">Traxstech</Link></li>
                    </ul>
                </li>

                <li className="dropdown2">
                    <Link href="/inventory?type=Outboard Motors&availability=In Stock">Outboards</Link>
                    <ul>
                        <li><Link href="/hondaoutboards">Honda</Link></li>
                        <li><Link href="/inventory?availability=In Stock">Mercury</Link></li>
                        <li><Link href="/yamahaoutboards">Yamaha Outboards</Link></li>
                    </ul>
                </li>

                <li className="dropdown2">
                    <Link href="/service">Service</Link>
                    <ul>
                        <li><Link href="/service-request">Service Request</Link></li>
                        <li><Link href="/winterization-storage">Winterization & Storage</Link></li>
                        <li><Link href="/winterize-liability-form">Winter Storage/Winterize Liability Form</Link></li>
                        <li><Link href="/pontoon-trailer-rentals">Pontoon Trailer Rentals</Link></li>
                    </ul>
                </li>

                <li className="dropdown2">
                    <Link href="/company">Company Info</Link>
                    <ul>
                        <li><Link href="/about">About Us</Link></li>
                        <li><Link href="/blog">Blog</Link></li>
                        <li><Link href="/events">Events List</Link></li>
                        <li><Link href="/financing">Financing</Link></li>
                        <li><Link href="/annual-water-demo">Annual Water Demo</Link></li>
                        <li><Link href="/careers">Careers</Link></li>
                    </ul>
                </li>
            </ul>
        </>
    )
}
