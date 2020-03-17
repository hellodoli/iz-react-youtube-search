import { combineReducers } from "redux";
import {
  VIDEO_SELECTED,
  VIDEO_LAYOUT,
  FETCH_VIDEOS,
  FETCH_MORE_VIDEOS,
  FETCH_FILTER_VIDEOS,
  RESET_FILTER_LIST,
  CHANGE_FILTER_PARAMS,
  PREV_FILTER_LIST
} from "../constants/videos";
import { mapKeysYoutubeVideo } from "../helper";

const selectedVideo = (state = null, action) => {
  switch (action.type) {
    case VIDEO_SELECTED:
      return action.payload;
    default:
      return state;
  }
};

const layout = (layout = 0, action) => {
  switch (action.type) {
    case VIDEO_LAYOUT:
      return action.layout;
    default:
      return layout;
  }
};

const videos = (state = [null, {}], action) => {
  switch (action.type) {
    case FETCH_VIDEOS:
      return [
        action.payload.nextPageToken,
        { ...mapKeysYoutubeVideo(action.payload.items) }
      ];
    case FETCH_MORE_VIDEOS:
      return [
        action.payload.nextPageToken,
        { ...state[1], ...mapKeysYoutubeVideo(action.payload.items) }
      ];
    case FETCH_FILTER_VIDEOS:
      return [
        action.payload.nextPageToken,
        { ...mapKeysYoutubeVideo(action.payload.items) }
      ];
    default:
      return state;
  }
};

const filterParams = (state = { type: "video" }, action) => {
  switch (action.type) {
    case CHANGE_FILTER_PARAMS:
      return action.payload;
    default:
      return state;
  }
};

const isResetFilterList = (state = false, action) => {
  switch (action.type) {
    case RESET_FILTER_LIST:
      return action.payload;
    default:
      return state;
  }
};

const prevFilterList = (state = [], action) => {
  switch (action.type) {
    case PREV_FILTER_LIST:
      return action.payload;
    default:
      return state;
  }
};

const videosReducer = combineReducers({
  layout,
  selectedVideo,
  videos,
  isResetFilterList,
  prevFilterList,
  filterParams
});

export default videosReducer;
