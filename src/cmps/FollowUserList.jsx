import React from 'react'

// import { ReviewPreview } from '../cmps/ReviewPreview'

export function FollowUserList(props) {

    return (
        <section className="follow-user-list-container">

            <div className="title flex space-between">
                <h4>following users</h4>
            <select name="filter-events" id="">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>
            <div className="events">
                <ul>
                    <li>user</li>
                    <li>user</li>
                    <li>user</li>
                    <li>user</li>
                    <li>user</li>
                </ul>
            </div>
            {/* {props.reviews.map(review => <ReviewPreview key={review.id} review={review} />)} */}
        </section>
    )
}