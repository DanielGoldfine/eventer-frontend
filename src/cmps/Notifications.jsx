import React from 'react'

import { NotificationPreview } from './NotificationPreview'

export function Notifications(props) {

    let unreadCount = 0;

    props.notification.msgs.forEach(msg => {
        if (!msg.isRead) unreadCount++;
    });

    return (
        <section className="notifications-container">
            <div className="not-header flex  column justify-center">
                <h1>Notifications {unreadCount > 0 && <span>{unreadCount} Unread</span>}</h1>
            </div>
            {/* <p>Total notifications {props.notification.msgs.length}</p> */}
            <div className="notifications-list">
                {props.notification.msgs.map(msg => <NotificationPreview key={msg._id} msg={msg} />)}
            </div>
        </section>
    )
}