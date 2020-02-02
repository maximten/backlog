import { createStore as createStoreInner, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { lists } from 'src/store/lists';

const rootReduer = combineReducers({ lists });

export const createStore = () => createStoreInner(rootReduer,
  composeWithDevTools(applyMiddleware(thunk)));
