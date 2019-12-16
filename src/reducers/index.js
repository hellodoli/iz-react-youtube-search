import { combineReducers } from 'redux';
import videosReducer from './videos';
import searchReducer from './search';
import oauthReducer from './oauth';

const rootReducer = combineReducers({
  videosReducer,
  searchReducer,
  oauthReducer
});

export default rootReducer;