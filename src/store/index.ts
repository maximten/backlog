import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { stacks } from 'src/store/stacks';

const rootReduer = combineReducers({
  stacks,
});

export const store = createStore(rootReduer, composeWithDevTools(applyMiddleware(thunk)));
