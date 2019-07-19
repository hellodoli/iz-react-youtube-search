import { 
    SEARCH_VALUE
} from '../constants/search';

import { combineReducers } from 'redux';

const changeValueSearchReducer = (value = "", action) => {
    switch (action.type) {
        case SEARCH_VALUE:
            return action.value;
        default:
            return value;
    }
}

const searchReducer = combineReducers({
    changeValueSearchReducer
});

export default searchReducer;