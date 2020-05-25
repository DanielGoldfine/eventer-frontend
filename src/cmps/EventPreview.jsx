import React from 'react';
import UserPreview from './UserPreview';
import Moment from 'moment';
import history from '../history.js'


export default function EventPreview(props) {

    const eventDesc = (props.event.description.length >= 130) ? props.event.description.slice(0, 130) + '...' : props.event.description

    const imgUrl = ((props.event.imgUrl.includes('http') ? props.event.imgUrl : require(`../assets/imgs/${props.event.category.replace(/\s+/g, '')}.jpg`)))

    console.log(props.event)
    return (


        <section className="event-preview flex column space-between ">
            <div>
                <p className="event-title" onClick={() => {history.push(`event/${props.event._id}`)}}>{props.event.title}</p>
                <p className="event-time">{Moment(props.event.startAt * 1000).toString().split(' ').slice(0, 3).join(' ')}</p>
                <div onClick={() => {history.push(`event/${props.event._id}`)}} className="event-img-container">
                    <img className="event-img" src={imgUrl} alt="" />
                </div>

                <p className="event-desc">{eventDesc}</p>
            </div>





            <div className="flex column">
                <UserPreview ranking minimalUser={props.event.createdBy} />
                <div onClick={() => {history.push(`event/${props.event._id}`)}} className="event-preview-bottom flex space-between">
                    <div class="participants"> {((props.event.members.length !== 0) && (!props.event.capacity)) &&
                        <p>{props.event.members.length} People are already in</p>}
                        {((props.event.members.length !== 0) && (props.event.capacity)) &&
                            <p>{props.event.members.length}/{props.event.capacity} People are already in</p>}
                        {(props.event.members.length === 0) && <p>Be the first to subscribe</p>}
                    </div>
                    <p className="price">{(props.event.price) ? `$${props.event.price}` : 'Free'}</p>
                </div>
            </div>


        </section>
    );
}