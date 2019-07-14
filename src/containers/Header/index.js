import React from 'react';

import { 
    HeaderWrapp,
    HeaderWrappInner,
    HeaderWrappForSearch
} from './styled';

import { Container } from 'react-bulma-components';

import Search from '../../components/Search';


export const Header = (props) => {
    return(
        <HeaderWrapp>
            <Container>
                <HeaderWrappInner>
                    <HeaderWrappForSearch>
                        <Search onFormSubmit={props.onFormSubmit} />
                    </HeaderWrappForSearch>
                </HeaderWrappInner>
            </Container>
        </HeaderWrapp>
    );
}

export default Header;