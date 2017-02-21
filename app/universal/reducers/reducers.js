import { ADD_ITEM } from '../actions/action.js';
import { combineReducers } from 'redux';


function items(state = [{name: '111'}, {name:'222'}, {name:'333'}], action) {
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