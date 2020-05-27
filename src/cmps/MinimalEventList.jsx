import React from 'react'

// import { ReviewPreview } from '../cmps/ReviewPreview'

export function MinimalEventList(props) {

    return (
        <section className="minimal-event-list-container">

            <div className="title flex space-between">
                <h4>created events</h4>
                <select name="filter-events" id="">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>
            <div className="events">
                <ul>
                    <li>event</li>
                    <li>event</li>
                    <li>event</li>
                    <li>event</li>
                    <li>event</li>
                </ul>
            </div>
            {/* {props.reviews.map(review => <ReviewPreview key={review.id} review={review} />)} */}
        </section>
    )
}