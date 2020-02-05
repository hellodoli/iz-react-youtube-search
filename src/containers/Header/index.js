import React from "react";

import { SkinContext, themes } from "../../skin-context";

import { Container } from "react-bulma-components";
// components
import { IZButton } from "../../components/Buttons";
import Search from "../../components/Search";
import DropdownTheme from "../../components/DropdownTheme";
import OAuth from "../../components/OAuth";

import {
  HeaderWrapp,
  HeaderWrappInner,
  HeaderWrappForSearch,
  HeaderWrappThemeSwitch
} from "./styled";

function Header() {
  return (
    <HeaderWrapp>
      <Container>
        <HeaderWrappInner>
          <HeaderWrappForSearch>
            <Search />
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
                    <span className="text">
                      Dark theme:{" "}
                      {theme.background === themes.light.background
                        ? "OFF"
                        : "ON"}
                    </span>
                    <span className="icons">
                      {theme.background === themes.light.background ? (
                        <i className="fas fa-lightbulb"></i>
                      ) : (
                        <i className="far fa-lightbulb"></i>
                      )}
                    </span>
                  </IZButton>
                </div>
                <div className="item">
                  <DropdownTheme
                    changeThemeColor={changeThemeColor}
                    themeColor={themeColor}
                  />
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

export default Header;
