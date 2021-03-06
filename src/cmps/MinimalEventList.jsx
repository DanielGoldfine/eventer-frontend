import React from 'react'

import MinimalEventPreview from './MinimalEventPreview'

export class MinimalEventList extends React.Component {

    state = {
        listState: 'Created'
    }

    render() {

        const { listState } = this.state;

        return (
            <section className="minimal-event-list-container user-details-list">

                <div className="list-header flex align-center space-between">
                    <h4>Created Events</h4>
                </div>
                <div className="list">
                    {this.props.events.length === 0 && <h5>No Events yet, Create and invite your friends</h5>}
                    <ul>
                        {this.props.events.map(event => <MinimalEventPreview key={event._id} event={event} />)}
                    </ul>
                </div>
            </section>
        )
    }
}