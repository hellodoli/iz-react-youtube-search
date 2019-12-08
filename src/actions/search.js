import { SEARCH_VALUE } from '../constants/search';

export const changeValueSearch = searchVal => ({
    type: SEARCH_VALUE,
    value: searchVal
});
