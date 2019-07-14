import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { changeLayout } from '../../actions/videos';
import {
    SearchWrapp,
    SearchInput,
    SearchButton
} from './styled';

class Search extends Component {
    
    constructor() {
        super();
        this.state = {
            preVal: '',
            val: ''
        }
        this.inputSearch = React.createRef();
    }

    handleOnchange = (e) => {
        this.setState({ val: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { preVal, val } = this.state;
        if( val.trim() === "" ) {
            return;
        }else {
            if(preVal === val) return;
            this.setState({ preVal: val });
            this.props.onFormSubmit(val);
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

export default connect(
    null, 
    { changeLayout }
)(Search);