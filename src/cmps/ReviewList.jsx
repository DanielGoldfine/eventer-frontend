import React from 'react'

import { ReviewPreview } from '../cmps/ReviewPreview'

export function ReviewList(props) {

    return (
        <section className="review-list-container">
            {props.reviews.map(review => <ReviewPreview key={review.id} review={review} />)}
        </section>
    )
}