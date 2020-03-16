import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import product from "./reducers/product";
import notice from "./reducers/notice";
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
    product,//相当于 product:product
    notice
});

export default createStore(rootReducer,compose(applyMiddleware(...[thunk])));