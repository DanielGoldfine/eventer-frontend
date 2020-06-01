import React from 'react';
import EventPreview from "./EventPreview";

export default function EventList(props) {
	// console.log(props)

	return (
		<div className="event-list">
			{props.events.map(event =>
				<EventPreview
					onDelete={props.onDelete}
					key={event._id}
					event={event}
					onSubscribe={props.onSubscribe} 
					minimalLoggedInUser={props.minimalLoggedInUser}
					/>
			)
			}
		</div>
	)
}


