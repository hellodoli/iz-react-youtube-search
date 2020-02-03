import React, { Component } from "react";

import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { changeLayout } from "../../actions/videos";
import { changeValueSearch } from "../../actions/search";

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

  onSubmit = e => {
    e.preventDefault();
    const { inputValue } = this.state;
    if (inputValue.trim() === "" || inputValue === this.props.searchValue)
      return;
    this.props.changeValueSearch(inputValue);
    this.props.onFormSubmit(inputValue);
    this.props.changeLayout(0);
    this.props.history.push("/"); // back to display VideoList
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

const mapStateToProps = state => ({
  searchValue: state.searchReducer.changeValue
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    changeLayout,
    changeValueSearch
  })
)(Search);
