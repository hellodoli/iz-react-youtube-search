import React, { Component } from "react";

import { connect } from "react-redux";

import { fecthVideos } from "../../actions/videos";

import { FILTER_PARAM_OB } from "../../constants/search";

// Components
// import Filter from "../../components/Filter";
// import { VideoList } from "../../components/Videos";

class SearchResultShow extends Component {
  state = {
    isLoading: false,
    isValidLink: true
  };

  fetchData = async search => {
    this.setState({ isLoading: true });
    await this.props.fecthVideos(search);
    this.setState({ isLoading: false });
  };

  checkValidSearchParam = searchParamString => {
    const arrKey = [];
    let isValid = true;
    let errorCode = -1;

    const searchParam = new URLSearchParams(searchParamString);
    searchParam.forEach((val, key) => arrKey.push(key));

    function checkExistKey(arrKey, inputKey) {
      for (let i = 1; i < arrKey.length; i++) {
        if (arrKey[i] === inputKey) return true;
      }
      return false;
    }

    if (arrKey.length > 0) {
      if (arrKey[0] === FILTER_PARAM_OB.searchQuery.viewName) {
        if (searchParam.get(arrKey[0]).trim() === "") {
          isValid = false;
          errorCode = 3; // search query is empty string
        } else {
          // start from second param
          for (let i = 1; i < arrKey.length; i++) {
            // UPLOAD DATE
            if (arrKey[i] === FILTER_PARAM_OB.uploadDate.viewName) {
              if (checkExistKey(arrKey, FILTER_PARAM_OB.type.viewName)) {
              }
            }
          }
        }
      } else {
        isValid = false;
        errorCode = 2; // search query must be first param
      }
    } else {
      isValid = false;
      errorCode = 1; // empty param
    }

    return {
      isValid,
      data: arrKey,
      errorCode
    };
  };

  searchVideo = () => {
    const arrKey = [];
    const searchParam = new URLSearchParams(this.props.location.search);
    searchParam.forEach((val, key) => arrKey.push(key));

    if (arrKey.length > 0) {
      if (arrKey[0] === "search_query") {
        // const searchValue = searchParam.get(arrKey[0]);
        if (arrKey.length === 1) {
          // only search
          //this.fetchData(searchValue);
        } else {
          // search with filter
        }
        return;
      }
      this.setState({ isValidLink: false, isLoading: false }); // invalid link
    } else {
      this.setState({ isValidLink: false, isLoading: false }); // invalid link
    }
  };

  componentDidMount() {
    //this.searchVideo();
  }

  render() {
    return <div>SearchResultShow</div>;
  }
}

export default connect(null, { fecthVideos })(SearchResultShow);
