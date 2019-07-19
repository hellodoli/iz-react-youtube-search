import { combineReducers } from 'redux';

import songs from './songs';
import videos from './videos';
import search from './search';

const rootReducer = combineReducers({
    songs,
    videos,
    search
});

export default rootReducer;