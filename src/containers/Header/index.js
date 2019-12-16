import React from 'react';
import { Container } from 'react-bulma-components';
import {
	HeaderWrapp,
	HeaderWrappInner,
	HeaderWrappForSearch,
	HeaderWrappThemeSwitch
} from './styled';
import { IZButton } from '../../components/Buttons';
import Search from '../../components/Search';
import DropdownTheme from '../../components/DropdownTheme';
import OAuth from '../../components/OAuth';

import { SkinContext, themes } from '../../skin-context';
import PropTypes from 'prop-types';

const Header = (props) => {
	return ( 
		<HeaderWrapp>
			<Container>
				<HeaderWrappInner>
					<HeaderWrappForSearch>
						<Search onFormSubmit={props.onFormSubmit} />
					</HeaderWrappForSearch>

					<SkinContext.Consumer>
						{({ theme, themeColor, toggleTheme, changeThemeColor }) => (
							<HeaderWrappThemeSwitch>
								<div className="item">
									<IZButton
										className="btn-adjust"
										color="secondary"
										isOutlined={true} 
										onClick={toggleTheme}
									>
										<span className="text">Dark theme: { theme.background ===  themes.light.background ? 'OFF' : 'ON' }</span>
										<span className="icons">
											{ theme.background === themes.light.background
													? <i className="fas fa-lightbulb"></i>
													: <i className="far fa-lightbulb"></i>
											}
										</span>
									</IZButton>
								</div>
								<div className="item">
									<DropdownTheme changeThemeColor={changeThemeColor} themeColor={themeColor} />
								</div>
								<div className="item">
									<OAuth />
								</div>
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
