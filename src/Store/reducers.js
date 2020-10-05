import { combineReducers } from 'redux';

import auth from './Reducers/Auth'
import todo from './Reducers/ToDo'

export default combineReducers({
  auth,
  todo
});