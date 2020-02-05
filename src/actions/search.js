import { SEARCH_VALUE, SEARCH_LOADING } from "../constants/search";

export const changeSearchValue = searchVal => ({
  type: SEARCH_VALUE,
  value: searchVal
});

export const changeLoadingVideoStatus = status => ({
  type: SEARCH_LOADING,
  payload: status
});
