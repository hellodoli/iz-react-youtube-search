import React, { Component } from "react";
import { connect } from "react-redux";

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
    if (inputValue.trim() === "") return;
    this.props.changeValueSearch(inputValue);
    this.props.onFormSubmit(inputValue);
    this.props.changeLayout(0);
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

export default connect(null, {
  changeLayout,
  changeValueSearch
})(Search);
