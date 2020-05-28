import React, { Component } from 'react'
import eventService from '../services/eventService'

export default function MinimalEvent(props) {
    let event;
    eventService.query()
        .then(events => {
            event = events[20]
            console.log(event)
        })
    return (
        <React.Fragment>
            {event && <section>
                <h1>{event.title}}</h1>
            </section>}
        </React.Fragment>
    )
}
