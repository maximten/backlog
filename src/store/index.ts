import { createStore as createStoreInner, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { stacks } from 'src/store/stacks';
import { lists } from 'src/store/lists';


export const createStore = () => {
  const rootReduer = combineReducers({
    stacks,
    lists,
  });
  return createStoreInner(rootReduer,
    composeWithDevTools(applyMiddleware(thunk)));
};
