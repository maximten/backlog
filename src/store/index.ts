import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { stacks } from 'src/store/stacks';

const rootReduer = combineReducers({
  stacks,
});

export const store = createStore(rootReduer, composeWithDevTools());
