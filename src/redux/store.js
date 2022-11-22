import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootRedcuer from './reducers'

let store = createStore(
    rootRedcuer, 
    composeWithDevTools(applyMiddleware(thunk))
    );


export default store;