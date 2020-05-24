const initialState = {
    loggedInUser: null,
    minimalLoggedInUser: null,
    isNotificationsOpen: false
}

export default function UserReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_LOGGED_IN_USER':
            const minimalLoggedInUser = {
                _id: action.user._id,
                fullName: action.user.fullName,
                imgUrl: action.user.imgUrl,
                rank: action.user.rank
            }
            return {
                ...state,
                loggedInUser: {...action.user},
                minimalLoggedInUser
            };
        // case 'SET_USER':
        //     return {
        //         ...state,
        //         currUser: { ...action.user }
        //     };
        case 'REMOVE_USER':
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            };
        case 'ADD_USER':
            return {
                ...state,
                users: [...state.users, action.user]
            }
        case 'UPDATE_USER':
            return {
                ...state,
                users: state.users.map(user => {
                    if (user._id === action.user._id) return action.user;
                    return user;
                })
            }
        case 'TOGGLE_NOTIFICATIONS':
            return {
                ...state,
                filterBy: { ...action.isNotificationOpen }
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
