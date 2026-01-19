'use client'

import Image from 'next/image'
import posthog from 'posthog-js'

const ExoploreBtn = () => {
    const handleExploreClick = () => {
        posthog.capture('explore_events_clicked')
    }

    return (
        <section>
            <button type="button" id="explore-btn" className="mt-7 mx-auto" onClick={handleExploreClick}>
                <a href="#events">
                    Explore Events
                    <Image src="icons/arrow-down.svg" alt="down arrow" width={24} height={24} />
                </a>
            </button>
        </section>
    )
}

export default ExoploreBtn