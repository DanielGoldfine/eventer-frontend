import React from 'react'

export class FollowUserList extends React.Component {

    state = {
        listState: 'Following'
    }

    render() {

        const {listState} = this.state;

        return (
            <section className="follow-list-container user-details-list">

                <div className="list-header flex align-center space-between">
                    <h4>Events</h4>
                    <select name="list-filter" id="">
                        <option value="active">Created</option>
                        <option value="inactive">Subscribed</option>
                    </select>
                </div>
                <div className="list">
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
}