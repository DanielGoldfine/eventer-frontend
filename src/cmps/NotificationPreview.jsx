import React from 'react'
import UserPreview from './UserPreview'
import { Link } from "react-router-dom";
import Moment from 'moment';
import history from '../history.js'

export function NotificationPreview(props) {
    // console.log(props.msg.type)
    let notificationTxt
    let notificationTopic
    switch (props.msg.type) {
        case 'update_event_details':
            notificationTxt = 'had updated '
            notificationTopic = 'event';
            break;
        case 'user_join_event':
            notificationTxt = 'had joined '
            notificationTopic = 'event';
            break;
        case 'user_left_event':
            notificationTxt = 'had left '
            notificationTopic = 'event';
            break;
        case 'new_event':
            notificationTxt = 'had created a new event'
            notificationTopic = 'event';
            break;
            //todo - add the user-follow socket
        // case 'user_follow': 
        //     notificationTxt = 'is following you now'
        //     notificationTopic = 'user';
        //     break;
        case 'user_review':
            notificationTxt = 'had ranked you'
            notificationTopic = 'user';
            break;

    }
    return (
        <section>
            <UserPreview minimalUser={props.msg.user}></UserPreview>
            <span>{notificationTxt}</span>
            {/* {notificationTopic === 'event' && <Link to={`/event/${props.msg.event._id}`}>{props.msg.event.title}</Link>} */}
            {notificationTopic === 'event' && <button onClick={() => { history.push(`/event/${props.msg.event._id}`) }}>{props.msg.event.title}</button>}
            {/* {notificationTopic === 'user' && <Link to={`/user/${props.msg.user._id}`}>Check it out</Link>} */}
            {notificationTopic === 'user' && <button onClick={() => { history.push(`/user/${props.msg.user._id}`) }}>Check it out</button>}
            <small>{Moment(props.msg.createdAt).fromNow()} </small>
        </section>
    )
}

