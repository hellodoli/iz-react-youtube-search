export const SEARCH_VALUE = "@@search/SEARCH_VALUE";

/*
  codeName: value use for call API
  viewName: value use for query name link browser
  name: value text (uppercase) show in screen

  items:
  parent:
  isgnore:
*/
export const FILTER_PARAM_OB = {
  searchQuery: {
    name: "SEARCH QUERY",
    codeName: "q",
    viewName: "search_query"
  },
  uploadDate: {
    name: "UPLOAD DATE",
    codeName: "publishedAfter",
    viewName: "upload_date",
    items: [
      {
        codeName: ""
      }
    ],
    isgnore: [
      {
        codeName: "type",
        items: [0, 1, 1]
      }
    ]
  },
  type: {
    name: "TYPE",
    codeName: "type",
    viewName: "type"
  },
  duration: {
    name: "DURATION",
    codeName: "videoDuration",
    viewName: "duration"
  },
  sortBy: {
    name: "SORT BY",
    codeName: "order",
    viewName: "sort_by"
  }
};
