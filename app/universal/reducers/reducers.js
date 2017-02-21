import { ADD_ITEM } from '../actions/action.js';
import { combineReducers } from 'redux';


function items(state = [], action) {
    switch (action.type) {
        case ADD_ITEM:
            return [
                ...state,
                {
                    name: action.name
                }
            ]
        default:
            return state;
    }
}

const itemApp = combineReducers({
    list: items
});

export default itemApp;