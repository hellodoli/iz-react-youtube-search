import React from 'react';

import { 
    HeaderWrapp,
    HeaderWrappInner,
    HeaderWrappForSearch
} from './styled';

import { 
    Container, 
    Button
} from 'react-bulma-components';

import Search from '../../components/Search';
import DropdownTheme from '../../components/DropdownTheme';

import { SkinContext, themes } from '../../skin-context';

export const Header = (props) => {
    return(
        <SkinContext.Consumer>
            { ({ theme, themeColor, toggleTheme }) => (
                <HeaderWrapp>
                    <Container>
                        <HeaderWrappInner>

                            <HeaderWrappForSearch>
                                <Search onFormSubmit={props.onFormSubmit} />
                            </HeaderWrappForSearch>

                            <Button className="btn-adjust is-outlined" onClick={toggleTheme}>
                                <span className="text">Dark theme: { theme.background ===  themes.light.background ? 'OFF' : 'ON' }</span>
                                <span className="icons">
                                    { theme.background === themes.light.background
                                        ? <i className="fas fa-sun"></i>
                                        : <i className="far fa-sun"></i>
                                    }
                                </span>
                            </Button>

                            <DropdownTheme list={themeColor} />
                            
                        </HeaderWrappInner>
                    </Container>
                </HeaderWrapp>
            )}
        </SkinContext.Consumer>
    );
}

export default Header;