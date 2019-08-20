import { combineReducers } from 'redux';

import videos from './videos';
import search from './search';

const rootReducer = combineReducers({
    videos,
    search
});

export default rootReducer;