import { 
    VIDEO_SLECTED,
    VIDEO_LAYOUT
} from '../constants/videos';

export const selectVideo = video => ({
    type: VIDEO_SLECTED,
    payload: video
});

export const changeLayout = status => ({
    type: VIDEO_LAYOUT,
    layout: status
});