import { 
    SONG_SLECTED 
} from '../constants/songs';

export const selectSong = song => ({
    type: SONG_SLECTED,
    payload: song
});