import { combineReducers } from 'redux';
import eventReducer from './eventReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  userStore: userReducer,
  eventsStore: eventReducer
})

export default rootReducer;