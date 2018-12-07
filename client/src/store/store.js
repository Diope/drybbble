import rootReducer from './reducers';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

const inititalState = {};

const store = createStore(
  rootReducer,
  inititalState,
  compose(applyMiddleware(thunk), 
    window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()) // Needed to get Redux chrome extension to work
)

export default store;