import { 
    VIDEO_SLECTED,
    VIDEO_LAYOUT
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

const changeLayoutReducer = (layout = 0, action) => {
    switch (action.type) {
        case VIDEO_LAYOUT:
            return action.layout;
        default:
            return layout;
    }
}

const videosReducer = combineReducers({
    selectedVideosReducer,
    changeLayoutReducer
});

export default videosReducer;