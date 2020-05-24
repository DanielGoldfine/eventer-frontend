import React from 'react'
import { NotificationPreview } from './NotificationPreview'

export function Notifications() {

        return (
            <section className="notifications-container">
                <p className="header">Notifications</p>
                <NotificationPreview />
                <NotificationPreview />
                <NotificationPreview />
                <NotificationPreview />
                <NotificationPreview />
                <NotificationPreview />
                <NotificationPreview />
            </section>
        )
}
