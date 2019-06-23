import { 
    SONG_SLECTED
} from '../constants/songs';

import { combineReducers } from 'redux';

const listSongsReducer = () => {
    return [
        { title: 'Fancy', duration: '2:30' },
        { title: 'Yes or Yes', duration: '2:30' },
        { title: 'Zimzalabim', duration: '2:30' },
        { title: 'Bad boy', duration: '2:30' }
    ]
}

const selectedSongReducer = (selectedSong = null, action) => {
    switch (action.type) {
        case SONG_SLECTED:
            return action.payload;
        default:
            return selectedSong;
    }
}

const songsReducer = combineReducers({
    listSongsReducer,
    selectedSongReducer
});

export default songsReducer;