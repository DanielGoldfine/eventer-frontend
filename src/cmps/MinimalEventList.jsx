import React from 'react'

import MinimalEventPreview from './MinimalEventPreview'

export class MinimalEventList extends React.Component {

    state = {
        listState: 'Created'
    }

    render() {

        // const { listState } = this.state;

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
                        {this.props.events.map(event => <MinimalEventPreview key={event._id} event={event} />)}
                    </ul>
                </div>
            </section>
        )
    }
}