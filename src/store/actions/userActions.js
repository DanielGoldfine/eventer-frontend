import userService from '../../services/userService.js';

export function login(credentials, loadingStatus) {
    return async dispatch => {
        try {
            toggleLoad(credentials, loadingStatus)
            const user = await userService.login(credentials)
            dispatch(setLoggedInUser(user), ()=>{toggleLoad(loadingStatus)});
        }
        catch (err) {
            console.log('userService: err in loagin', err);
        }
    }
}


export function loadUser(id) {
    return async dispatch => {
        try {
            const user = await userService.get(id)
            return user
            // dispatch(setUser(user));
        }
        catch (err) {
            console.log('userService: err in loading user', err);
        }
    }
}

export function saveUser(user) {
    return async dispatch => {
        try {
            const type = user._id ? 'UPDATE_USER' : 'ADD_USER';
            await userService.save(user)
            dispatch(_saveUser(type, user));
        }
        catch (err) {
            console.log('userService: err in saving user', err);
        }
    }
}


export function removeUser(userId) {
    return async dispatch => {
        try {
            await userService.remove(userId)
            dispatch(_removeUser(userId));
        }
        catch (err) {
            console.log('userService: err in removeUser', err);
        }
    }
}

export function addReview(review, user) {
    return async dispatch => {
        try {
            const updatedUser = await userService.addReview(review, user)
            dispatch(_saveUser('UPDATE_USER', updatedUser));
            return updatedUser
        }
        catch (err) {
            console.log('eventService: err in subsscribe action', err);
        }
    }
}


export function toggleNotifications(status) {
    return (dispatch) => {
        dispatch({ type: 'TOGGLE_NOTIFICATIONS', status });
        return Promise.resolve();
    };
}


export function toggleLoad(loadingStatus) {
    return (dispatch) => {
        dispatch({ type: 'TOGGLE_LOAD', loadingStatus });
    };
}


function setLoggedInUser(user) {
    return {
        type: 'SET_LOGGED_IN_USER',
        user
    };
}

// function setUser(user) {
//     return {
//         type: 'SET_USER',
//         user
//     };
// }

function _removeUser(userId) {
    return {
        type: 'REMOVE_USER',
        userId
    };
}

function _saveUser(user, type) {
    return {
        type,
        user
    };
}