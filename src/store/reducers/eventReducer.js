// import { findAllByAltText } from "@testing-library/react";

const initialState = {
    events: [],
    currEvent: null, //for the edit and details pages
    filterBy: {
        txt: '',
        category: '',
        date: '',
        radius: '',
        locationType: '',
        userLocation: '',
        price: '',
        sortDate: false,
        sortNearby: false,
        limit: null
    },
    isLoading: false
}



export default function EventReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_EVENTS':
            return {
                ...state,
                events: [...action.events]
            };
        case 'SET_EVENT':
            return {
                ...state,
                currEvent: { ...action.event }
            };
        case 'REMOVE_EVENT':
            return {
                ...state,
                events: state.events.filter(event => event._id !== action.eventId)
            };
        case 'ADD_EVENT':
            return {
                ...state,
                events: [...state.events, action.event]
            }
        case 'UPDATE_EVENT':
            return {
                ...state,
                events: state.events.map(event => {
                    if (event._id === action.event._id) return action.event;
                    return event;
                })
            }
        case 'SET_FILTER':
            return {
                ...state,
                filterBy: { ...action.filter }
            }
        case 'TOGGLE_LOAD':
            return {
                ...state,
                isLoading: action.loadingStatus
            }
        default:
            return state;
    }
}