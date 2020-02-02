import {
  VIDEO_SELECTED,
  VIDEO_LAYOUT,
  FETCH_VIDEOS,
  FETCH_MORE_VIDEOS,
  FETCH_FILTER_VIDEOS,
  CHANGE_FILTER_PARAMS
} from "../constants/videos";

import youtube, { defaultParams } from "../apis/youtube";

export const selectVideo = video => ({
  type: VIDEO_SELECTED,
  payload: video
});

export const changeLayout = status => ({
  type: VIDEO_LAYOUT,
  layout: status
});

export const changeFilterParams = newFilterParams => ({
  type: CHANGE_FILTER_PARAMS,
  payload: newFilterParams
});

export const fecthVideos = search => async dispatch => {
  try {
    const params = {
      ...defaultParams,
      q: search,
      type: "video"
    };

    const response = await youtube.get("/search", { params });
    const data = response.data;
    if (data.items && data.items.length > 0) {
      dispatch({
        type: FETCH_VIDEOS,
        payload: data
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchFilterVideos = (search, filterParams) => async dispatch => {
  try {
    const params = {
      ...defaultParams,
      q: search,
      ...filterParams
    };

    const response = await youtube.get("/search", { params });
    const data = response.data;
    if (data.items && data.items.length > 0) {
      dispatch({
        type: FETCH_FILTER_VIDEOS,
        payload: data
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchMoreVideos = (
  search,
  nextPageToken,
  filterParams = null
) => async dispatch => {
  try {
    let params = {
      ...defaultParams,
      type: "video",
      q: search,
      pageToken: nextPageToken
    };

    if (filterParams !== null) {
      params = {
        ...params,
        ...filterParams
      };
    }

    const response = await youtube.get("/search", { params });
    const data = response.data;
    if (data.items && data.items.length > 0) {
      dispatch({
        type: FETCH_MORE_VIDEOS,
        payload: data
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchVideoById = videoId => async dispatch => {
  try {
    let video = null;
    let params = {
      ...defaultParams,
      part: "snippet,contentDetails,statistics",
      id: videoId
    };

    const response = await youtube.get("/videos", { params });
    const data = response.data.items;
    if (data && data.length > 0) {
      const {
        id,
        kind,
        snippet: { title, channelTitle }
      } = data[0];
      video = {
        id,
        kind,
        title,
        channelTitle
      };
    }

    dispatch({
      type: VIDEO_SELECTED,
      payload: video
    });
  } catch (error) {
    console.log(error);
  }
};
