import { 
  VIDEO_SELECTED,
  VIDEO_LAYOUT,

  FETCH_VIDEOS,
  FETCH_MORE_VIDEOS,
  FETCH_FILTER_VIDEOS,

  CHANGE_FILTER_PARAMS
} from '../constants/videos';

import youtube, { defaultParams } from '../apis/youtube';

export const selectVideo = video => ({
  type: VIDEO_SELECTED,
  payload: video
});

export const changeLayout = status => ({
  type: VIDEO_LAYOUT,
  layout: status
});

export const changeFilterParams = (newFilterParams) => ({
  type: CHANGE_FILTER_PARAMS,
  payload: newFilterParams
});

export const fecthVideos = (search) => async (dispatch) => {
  try {
    const params = {
      ...defaultParams,
      q: search,
      type: 'video'
    };

    const response = await youtube.get('/search', { params });
    dispatch({
      type: FETCH_VIDEOS,
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
      payload: 
        response.data.items.length > 0
          ? response.data
          : []
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchMoreVideos = (search, nextPageToken, filterParams = null) => async (dispatch) => {
  try {
    let params = {
      ...defaultParams,
      type: 'video',
      q: search,
      pageToken: nextPageToken
    };

    if (filterParams !== null) {
      params = {
        ...params,
        ...filterParams,
      }
    }
    
    const response = await youtube.get('/search', { params });

    dispatch({
      type: FETCH_MORE_VIDEOS,
      payload: 
        response.data.items.length > 0
          ? response.data
          : []
    });
  } catch (error) {
    console.log(error);
  }
};
