import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import pinReducer from './pin'
import commentsReducer from './comment';
import boardReducer from './pinBoard';
import jointableReducer from './jointable';

const rootReducer = combineReducers({
  session,
  pins: pinReducer,
  comments: commentsReducer,
  boards: boardReducer,
  jointable: jointableReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
