import React,{ Component } from 'react';
import { connect } from 'react-redux';

import { changeLayout } from '../../actions/videos';
import { changeValueSearch } from '../../actions/search';

import {
    SearchWrapp,
    SearchInput,
    SearchButton
} from './styled';

class Search extends Component {
    
    constructor() {
        super();
        this.inputSearch = React.createRef();
    }

    handleOnchange = (e) => {
        this.props.changeValueSearch(e.target.value);// change value is global
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { searchValue } = this.props;
        if( searchValue.trim() === "" ) {
            return;
        }else {
            this.props.onFormSubmit(searchValue);
            this.props.changeLayout(0);
        }
    }

    render() {
        
        return(
            <form onSubmit={this.onSubmit}>
                <SearchWrapp>
                    <SearchInput 
                        ref={this.inputSearch}
                        type="text"
                        value={this.props.searchValue}
                        onChange={this.handleOnchange}
                    />
                    <SearchButton color="primary"> 
                        <i className="fas fa-search"></i>
                    </SearchButton>
                </SearchWrapp>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        searchValue: state.search.changeValueSearchReducer
    }
}

export default connect(
    mapStateToProps, 
    { 
        changeLayout,
        changeValueSearch
    }
)(Search);