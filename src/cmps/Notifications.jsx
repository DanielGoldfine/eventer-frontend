import React from 'react'

import { NotificationPreview } from './NotificationPreview'

export function Notifications(props) {
    return (
        <section className="notifications-container">
            <p className="header">Notifications</p>
            <p>Total notifications {props.notification.msgs.length}</p> 
            {props.notification.msgs.map(msg => <NotificationPreview key={msg._id} msg={msg} />)}
        </section>
    )
}

