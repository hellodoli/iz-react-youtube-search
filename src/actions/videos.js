import { 
    VIDEO_SLECTED
} from '../constants/videos';

export const selectVideo = video => ({
    type: VIDEO_SLECTED,
    payload: video
});