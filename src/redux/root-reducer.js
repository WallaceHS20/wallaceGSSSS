import { combineReducers } from 'redux';
import userReducer from './user/userSlice';
import termReducer from './termo/termoSlice'

export default combineReducers({
  user: userReducer,
  term: termReducer,
});
