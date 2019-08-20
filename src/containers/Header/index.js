import React from 'react';

import { Container, Button } from 'react-bulma-components';
    
import { 
    HeaderWrapp,
    HeaderWrappInner,
    HeaderWrappForSearch,
    HeaderWrappThemeSwitch
} from './styled';

import Search from '../../components/Search';
import DropdownTheme from '../../components/DropdownTheme';

import { SkinContext, themes } from '../../skin-context';

export const Header = (props) => {
    return(
        <SkinContext.Consumer>
            { ({ theme, toggleTheme, changeThemeColor }) => (
                <HeaderWrapp>
                    <Container>
                        <HeaderWrappInner>

                            <HeaderWrappForSearch>
                                <Search onFormSubmit={props.onFormSubmit} />
                            </HeaderWrappForSearch>

                            <HeaderWrappThemeSwitch>
                            
                                <Button className="btn-adjust is-outlined" onClick={toggleTheme}>
                                    <span className="text">Dark theme: { theme.background ===  themes.light.background ? 'OFF' : 'ON' }</span>
                                    <span className="icons">
                                        { theme.background === themes.light.background
                                            ? <i className="fas fa-sun"></i>
                                            : <i className="far fa-sun"></i>
                                        }
                                    </span>
                                </Button>

                                <DropdownTheme changeThemeColor={changeThemeColor} />

                            </HeaderWrappThemeSwitch>

                        </HeaderWrappInner>
                    </Container>
                </HeaderWrapp>
            )}
        </SkinContext.Consumer>
    );
}

export default Header;