import React from 'react';
import { Container } from 'react-bulma-components';
import { 
	HeaderWrapp,
	HeaderWrappInner,
	HeaderWrappForSearch,
	HeaderWrappThemeSwitch
} from './styled';
import { IZButton } from '../../styled/Buttons';
import Search from '../../components/Search';
import DropdownTheme from '../../components/DropdownTheme';

import { SkinContext, themes } from '../../skin-context';
import PropTypes from 'prop-types';

const Header = (props) => {
    return( 
			<HeaderWrapp>
				<Container>
					<HeaderWrappInner>
						<HeaderWrappForSearch>
							<Search onFormSubmit={props.onFormSubmit} />
						</HeaderWrappForSearch>

						<SkinContext.Consumer>
							{ ({ theme, toggleTheme, changeThemeColor }) => (
								<HeaderWrappThemeSwitch>
									<IZButton color="secondary" isOutlined={true} className="btn-adjust" onClick={toggleTheme}>
										<span className="text">Dark theme: { theme.background ===  themes.light.background ? 'OFF' : 'ON' }</span>
										<span className="icons">
											{ theme.background === themes.light.background
													? <i className="fas fa-sun"></i>
													: <i className="far fa-sun"></i>
											}
										</span>
									</IZButton>{' '}
									<DropdownTheme changeThemeColor={changeThemeColor} />
								</HeaderWrappThemeSwitch>
							)}
						</SkinContext.Consumer>
					</HeaderWrappInner>
				</Container>
			</HeaderWrapp>
    );
}

Header.propTypes = {
  onFormSubmit: PropTypes.func.isRequired
}

export default Header;
