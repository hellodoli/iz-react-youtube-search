import { combineReducers } from 'redux';
import videosReducer from './videos';
import search from './search';

const rootReducer = combineReducers({
  videosReducer,
  search
});

export default rootReducer;