
import "/public/assets/css/magnific-popup.min.css"
import "/public/assets/css/style.css"
import "/public/assets/css/custom-marine.css"


import { DM_Sans, Plus_Jakarta_Sans } from 'next/font/google'
const jakarta = Plus_Jakarta_Sans({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    variable: "--font-main-family",
    display: 'swap',
})
const dm = DM_Sans({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    variable: "--font-btn-family",
    display: 'swap',
})
// const pacifico = Pacifico({
//     weight: ['400'],
//     subsets: ['latin'],
//     // variable: "--nunito-font-family",
//     display: 'swap',
// })

export const metadata = {
    title: 'Foster Bros Marine - Boats, Pontoons, Motors & Trailers',
    description: 'Your Premier Marine Dealer in Delano, MN. New and used boats, pontoons, outboard motors, and trailers from top brands like Starcraft, Manitou, Yamaha, and more.',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`body counter-scroll ${dm.variable} ${jakarta.variable}`}>{children}</body>
        </html>
    )
}
