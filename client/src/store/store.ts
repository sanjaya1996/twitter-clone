import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import { LoggedInUserI } from './actions/user/userActionTypes';
import RootReducer from './reducers/rootReducer';

import rootReducer from './reducers/rootReducer';

const userInfoFromStorage: LoggedInUserI = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo')!)
  : null;

const initialState = { userLogin: { user: userInfoFromStorage } };

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootStore = ReturnType<typeof RootReducer>;

export default store;
