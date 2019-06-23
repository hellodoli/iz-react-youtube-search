import React,{ Component } from 'react';

import {
    SearchWrapp,
    SearchInput,
    SearchButton
} from './styled';

class Search extends Component {
    
    constructor() {
        super();
        this.state = {
            val: ''
        }
    }

    handleOnchange = (e) => {
        this.setState({ val: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.val.trim() === "") {
            return;
        }
        this.props.onFormSubmit(this.state.val);
    }

    render() {
        return(
            <form onSubmit={this.onSubmit}>
                <SearchWrapp>
                    <SearchInput 
                        type="text"
                        value={this.state.val}
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

export default Search;