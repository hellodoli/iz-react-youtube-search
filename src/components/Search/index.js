import React, { Component } from "react";

import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  changeSearchValue,
  changeLoadingVideoStatus
} from "../../actions/search";
import {
  changeLayout,
  fecthVideos,
  resetFilterList
} from "../../actions/videos";

import { SearchWrapp, SearchInput, SearchButton } from "./styled";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: ""
    };
    this.inputSearch = React.createRef();
  }

  handleOnchange = e => {
    this.setState({ inputValue: e.target.value });
  };

  search = async searchValue => {
    this.props.resetFilterList(true);
    this.props.changeLoadingVideoStatus(true);
    await this.props.fecthVideos(searchValue);
    this.props.changeLoadingVideoStatus(false);
    // back to display VideoList
    if (this.props.history.location.path !== "/") {
      this.props.history.push("/");
    }
  };

  onSubmit = async e => {
    e.preventDefault();
    const { inputValue } = this.state;
    const { changeSearchValue, changeLayout } = this.props;
    if (inputValue.trim() === "") return;

    changeSearchValue(inputValue); // change value search
    changeLayout(0);
    this.search(inputValue);
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <SearchWrapp>
          <SearchInput
            ref={this.inputSearch}
            type="text"
            value={this.state.inputValue}
            onChange={this.handleOnchange}
          />
          <SearchButton>
            <i className="fas fa-search"></i>
          </SearchButton>
        </SearchWrapp>
      </form>
    );
  }
}

export default compose(
  withRouter,
  connect(null, {
    changeSearchValue,
    changeLoadingVideoStatus,

    changeLayout,
    fecthVideos,
    resetFilterList
  })
)(Search);
