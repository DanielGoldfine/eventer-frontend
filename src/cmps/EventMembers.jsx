import React, { Component } from 'react'
import Button from '@material-ui/core/Button';

import UserPreview from './UserPreview'


export default class EventMembers extends Component {

    render() {
        const { members, capacity, createdBy, price, _id, title } = this.props.event
        const eventFull = (members.length === capacity) ? true : false
        const userInEvent = members.findIndex(member => member._id === this.props.loggedInUserId)
        const eventCostStr = price ? `Subscribe for only $${price}` : 'Join for free!'
        return (
            <section className="event-members-container" >
                
                {/* <div className="members-section">
                    Adding a lot of users with the below button
                    <Button variant="contained" color="primary" onClick={() => this.props.onSubscribeEvent()}>{eventCostStr}</Button>
                    {!eventFull && (userInEvent === -1) && this.props.loggedInUserId !== createdBy._id && <Button variant="contained" color="primary" onClick={() => this.props.onSubscribeEvent(this.props.loggedInUserId)}>{eventCostStr}</Button>}
                    {this.props.previewMode && <Button variant="contained" color="primary">{eventCostStr}</Button>}
                    {userInEvent >= 0 && <Button variant="contained" color="primary" onClick={() => this.props.onUnsubscribeEvent(this.props.loggedInUserId)}>Leave event</Button>}
                    <section>
                        {this.props.loggedInUserId === createdBy._id && <p>You can't join your own event!</p>}
                        {members.length === 0 && <p>Waiting for the first one to join... </p>}
                        {members.length > 0 && capacity && !eventFull && <p>{members.length}/{capacity} had joined </p>}
                        {members.length > 0 && !capacity && <p>{members.length} had joined </p>}
                        {eventFull && <p>Event is full, with {capacity} People</p>}
                        {members.length > 0 &&
                            <div className="event-members flex wrap">
                                {members.map((member) => <UserPreview key={member._id} minimalUser={member} starred={false} vertical={true} />)}
                            </div>}
                    </section>
                </div> */}

            </section>
        )

    }

}
