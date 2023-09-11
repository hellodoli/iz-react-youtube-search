import React, { Component, useState, useRef } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { compose } from 'redux'
import { connect } from 'react-redux'

import {
  changeSearchValue,
  changeLoadingVideoStatus,
} from '../../actions/search'
import { fecthVideos, resetFilterList } from '../../actions/videos'

import { SearchWrapp, SearchInput, SearchButton } from './styled'

/*const Search = () => {
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState('')
  const inputSearch = useRef(null)

  const search = async (searchValue) => {
    this.props.resetFilterList(true)
    this.props.changeLoadingVideoStatus(true)
    await this.props.fecthVideos(searchValue)
    this.props.changeLoadingVideoStatus(false)
    // back to display VideoList
    if (this.props.history.location.path !== '/') {
      this.props.history.push('/')
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (inputValue.trim() === '') return
    dispatch(changeSearchValue(inputValue)) // change value search
    search(inputValue)
  }

  return (
    <form onSubmit={onSubmit}>
        <SearchWrapp>
          <SearchInput
            ref={inputSearch}
            type="text"
            value={inputValue}
            onChange={this.handleOnchange}
          />
          <SearchButton>
            <i className="fas fa-search"></i>
          </SearchButton>
        </SearchWrapp>
      </form>
  )
}*/

class Search extends Component {
  constructor() {
    super()
    this.state = {
      inputValue: '',
    }
    this.inputSearch = React.createRef()
  }

  handleOnchange = (e) => {
    this.setState({ inputValue: e.target.value })
  }

  search = async (searchValue) => {
    this.props.resetFilterList(true)
    this.props.changeLoadingVideoStatus(true)
    await this.props.fecthVideos(searchValue)
    this.props.changeLoadingVideoStatus(false)
    // back to display VideoList
    if (this.props.history.location.path !== '/') {
      this.props.history.push('/')
    }
  }

  onSubmit = async (e) => {
    e.preventDefault()
    const { inputValue } = this.state
    if (inputValue.trim() === '') return

    this.props.changeSearchValue(inputValue) // change value search
    this.search(inputValue)
  }

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
    )
  }
}

export default compose(
  withRouter,
  connect(null, {
    changeSearchValue,
    changeLoadingVideoStatus,
    fecthVideos,
    resetFilterList,
  }),
)(Search)
