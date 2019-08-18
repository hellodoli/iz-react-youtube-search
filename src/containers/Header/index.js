import React from 'react';

import { 
    HeaderWrapp,
    HeaderWrappInner,
    HeaderWrappForSearch
} from './styled';

import { Container, Button } from 'react-bulma-components';

import Search from '../../components/Search';

import { SkinContext } from '../../skin-context';

export const Header = (props) => {
    return(
        <SkinContext.Consumer>
            { ({ theme, toggleTheme }) => (
                <HeaderWrapp theme={theme}>
                    <Container>
                        <HeaderWrappInner>

                            <HeaderWrappForSearch>
                                <Search onFormSubmit={props.onFormSubmit} />
                            </HeaderWrappForSearch>

                            <Button className="btn-adjust" color="primary" outlined={true} onClick={toggleTheme}>

                                <span className="text">Dark theme: {(theme.background === '#ffffff') ? 'OFF' : 'ON'}</span>

                                <span className="icons">
                                    { theme.background === '#ffffff'
                                        ? <i className="fas fa-sun"></i>
                                        : <i className="far fa-sun"></i>
                                    }
                                </span>
                                
                            </Button>

                        </HeaderWrappInner>
                    </Container>
                </HeaderWrapp>
            )}
        </SkinContext.Consumer>
    );
}

export default Header;