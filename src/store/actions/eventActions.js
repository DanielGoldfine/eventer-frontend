import eventService from '../../services/eventService.js';

export function loadEvents(filterBy, loadingStatus) {

    return async dispatch => {
        try {
            toggleLoad(loadingStatus)
            const events = await eventService.query(filterBy)
            dispatch(setEvents(events), ()=>{toggleLoad(loadingStatus)});
        }
        catch (err) {
            console.log('eventService: err in loading events', err);
        }
    }
}

export function loadEvent(id) {
    return async dispatch => {
        try {
            const event = await eventService.get(id)
            dispatch(setEvent(event));
        }
        catch (err) {
            console.log('eventService: err in loading event', err);
        }
    }
}

export function saveEvent(event) {
    return async dispatch => {
        try {
            const type = event._id ? 'UPDATE_EVENT' : 'ADD_EVENT';
            const savedEvent = await eventService.save(event)
            await dispatch(_saveEvent(type, event));
            return savedEvent
        }
        catch (err) {
            console.log('eventService: err in saving event', err);
        }
    }
}



export function removeEvent(eventId) {
    return async dispatch => {
        try {
            await eventService.remove(eventId)
            dispatch(_removeEvent(eventId));
        }
        catch (err) {
            console.log('eventService: err in removeEvent action', err);
        }
    }
}


export function addPost(event, minimalUser,text) {
    return async dispatch => {
        try {
            const updatedEvent = await eventService.addPost(event,minimalUser,text)
            dispatch(_saveEvent('UPDATE_EVENT', updatedEvent));
            return updatedEvent
        }
        catch (err) {
            console.log('eventService: err in add post action', err);
        }
    }
}
export function removePost(event,postId) {
    return async dispatch => {
        try {
            const updatedEvent = await eventService.removePost(event, postId)
            dispatch(_saveEvent('UPDATE_EVENT', updatedEvent));
        }
        catch (err) {
            console.log('eventService: err in remove post action', err);
        }
    }
}


export function subscribeEvent(event, minimalUser) {
    return async dispatch => {
        try {
            const updatedEvent = await eventService.addUserToEvent(event,minimalUser)
            dispatch(_saveEvent('UPDATE_EVENT', updatedEvent));
            return updatedEvent
        }
        catch (err) {
            console.log('eventService: err in subsscribe action', err);
        }
    }
}

export function unsubscribeEvent(event, userId) {
     return async dispatch => {
         try {
             const updatedEvent = await eventService.removeUserFromEvent(event,userId)
             dispatch(_saveEvent('UPDATE_EVENT', updatedEvent));
             return updatedEvent
         }
         catch (err) {
             console.log('eventService: err in joinEvent', err);
         }
     }
 }


export function setFilter(filter) {
    
    return (dispatch) => {
        dispatch({ type: 'SET_FILTER', filter });
        return Promise.resolve();
    };
}

export function toggleLoad(loadingStatus) {
    return (dispatch) => {
        dispatch({ type: 'TOGGLE_LOAD', loadingStatus });
    };
}

function setEvents(events) {
    return {
        type: 'SET_EVENTS',
        events
    };
}

function setEvent(event) {
    return {
        type: 'SET_EVENT',
        event
    };
}

function _removeEvent(eventId) {
    return {
        type: 'REMOVE_EVENT',
        eventId
    };
}



function _saveEvent(type,event) {
    return {
        type,
        event
    };
}