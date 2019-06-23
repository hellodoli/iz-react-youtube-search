import { combineReducers } from 'redux';

import songs from './songs';
import videos from './videos';

const rootReducer = combineReducers({
    songs,
    videos
});

export default rootReducer;

