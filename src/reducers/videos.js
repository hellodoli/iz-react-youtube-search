import { 
    VIDEO_SLECTED
} from '../constants/videos';

import { combineReducers } from 'redux';

const selectedVideosReducer = (selectedVideo = null, action) => {
    switch (action.type) {
        case VIDEO_SLECTED:
            return action.payload;
        default:
            return selectedVideo;
    }
}

const videosReducer = combineReducers({
    selectedVideosReducer
});

export default videosReducer;