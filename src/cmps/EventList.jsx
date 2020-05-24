import React from 'react';
import EventPreview from "./EventPreview";

export default function EventList(props) {

	return (
			<div className="preview-grid-container">
				{props.events.map(event => {
					return <EventPreview
						onDelete={props.onDelete}
						key={event._id}
						event={event}
						onSubscribe={props.onSubscribe} />
				})}
		</div>
	)
}

