import { SEARCH_VALUE, SEARCH_LOADING } from '../constants/search'

import { combineReducers } from 'redux'

const searchValue = (value = '', action) => {
  switch (action.type) {
    case SEARCH_VALUE:
      return action.value
    default:
      return value
  }
}

const isLoadingStatus = (state = false, action) => {
  switch (action.type) {
    case SEARCH_LOADING:
      return action.payload
    default:
      return state
  }
}

const searchReducer = combineReducers({
  searchValue,
  isLoadingStatus,
})

export default searchReducer
