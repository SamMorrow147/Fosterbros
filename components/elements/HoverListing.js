'use client'
import { useEffect } from 'react'


const HoverListing = () => {
    useEffect(() => {
        // Function to handle hover effect on thumbnail gallery
        const hoverThumbGallery = () => {
            const elements = document.querySelectorAll('.hover-listing-image')
            elements.forEach((element) => {
                const listingItems = element.querySelectorAll('.listing-item')
                const blItems = element.querySelectorAll('.bl-item')

                // Set the first listing item and bl item as active by default
                if (listingItems.length > 0 && blItems.length > 0) {
                    listingItems[0].classList.add('active')
                    blItems[0].classList.add('active')
                }

                if (listingItems.length > 0 && blItems.length > 0) {
                    listingItems.forEach((listingItem) => {
                        // Add event listener for mouseenter event
                        listingItem.addEventListener('mouseenter', function () {
                            const index = Array.from(listingItems).indexOf(listingItem)
                            // Remove active class from current active listing item and bl item
                            const activeListingItem = element.querySelector('.listing-item.active')
                            if (activeListingItem) activeListingItem.classList.remove('active')
                            // Add active class to the current listing item and corresponding bl item
                            listingItem.classList.add('active')
                            const activeBlItem = element.querySelector('.bl-item.active')
                            if (activeBlItem) activeBlItem.classList.remove('active')
                            if (blItems[index]) blItems[index].classList.add('active')
                        })

                        // Add event listener for mouseleave event
                        listingItem.addEventListener('mouseleave', function () {
                            // Remove active class from current listing item and corresponding bl item
                            listingItem.classList.remove('active')
                            const activeBlItem = element.querySelector('.bl-item.active')
                            if (activeBlItem) activeBlItem.classList.remove('active')
                            // Set the first listing item and bl item as active again
                            if (listingItems[0]) listingItems[0].classList.add('active')
                            if (blItems[0]) blItems[0].classList.add('active')
                        })
                    })
                }
            })
        }

        // Call the hoverThumbGallery function when the component mounts
        hoverThumbGallery()
    }, [])

    return null
}

export default HoverListing