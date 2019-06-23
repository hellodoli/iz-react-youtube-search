import React from 'react';

import { 
    HeaderWrapp,
    HeaderWrappInner,
    HeaderWrappForSearch
} from './styled';

import Search from '../../components/Search';


export const Header = (props) => {
    return(
        <HeaderWrapp>
            <HeaderWrappInner>
                <HeaderWrappForSearch>
                    <Search onFormSubmit={props.onFormSubmit} />
                </HeaderWrappForSearch>
            </HeaderWrappInner>
        </HeaderWrapp>
    );
}

export default Header;