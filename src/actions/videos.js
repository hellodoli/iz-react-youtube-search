import { 
  VIDEO_SLECTED,
  VIDEO_LAYOUT,

  FETCH_VIDEOS,
  FETCH_MORE_VIDEOS,
  FETCH_FILTER_VIDEOS
} from '../constants/videos';

import youtube, { defaultParams } from '../apis/youtube';

export const selectVideo = video => ({
  type: VIDEO_SLECTED,
  payload: video
});

export const changeLayout = status => ({
  type: VIDEO_LAYOUT,
  layout: status
});

export const fecthVideos = (search, nextPageToken = null) => async (dispatch) => {
  try {
    let type = FETCH_VIDEOS;
    let params = {
      ...defaultParams,
      type: 'video',
      q: search
    };

    if (nextPageToken !== null) {
      type = FETCH_MORE_VIDEOS;
      params = {
        ...params,
        pageToken: nextPageToken
      }
    }

    const response = await youtube.get('/search', { params });
    dispatch({
      type,
      payload:
        response.data.items.length > 0
          ? response.data
          : []
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchFilterVideos = (search, filterParams) => async (dispatch) => {
  try {
    const params = {
      ...defaultParams,
      q: search,
      ...filterParams
    };

    const response = await youtube.get('/search', { params });
    dispatch({
      type: FETCH_FILTER_VIDEOS,
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  }
};
