import { combineReducers } from 'redux';
import userReducer from './userReducer';

const RootReducer = combineReducers({
  user: userReducer,
});

export default RootReducer;
