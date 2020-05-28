import React from 'react'

import MinimalEvent from './MinimalEvent'

export class MinimalEventList extends React.Component {

    state = {
        listState: 'Created'
    }

    render() {

        const {listState} = this.state;

        return (
            <section className="minimal-event-list-container user-details-list">

                <div className="list-header flex align-center space-between">
                    <h4>Events</h4>
                    <select name="list-filter" id="">
                        <option value="active">Created</option>
                        <option value="inactive">Subscribed</option>
                    </select>
                </div>
                <div className="list">
                    <ul>
                        <MinimalEvent/>
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
}