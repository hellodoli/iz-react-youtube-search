import React, { Component } from "react";

// Theme Context
import { themes, themesColor, SkinContext } from "./skin-context";

import { Switch, Route } from "react-router-dom";

import { ThemeProvider } from "styled-components";
import { Container, Columns } from "react-bulma-components";

// Components
import Header from "./containers/Header";
import { VideoList } from "./components/Videos";

// Containers
import VideoSearchResult from "./containers/VideoSearchResult";
import VideoShow from "./containers/VideoShow";

/* Some custom CSS */
import GlobalStyle from "./styled/GlobalStyle";
import { MainWrapp, MainWrappContainer } from "./styled";

class App extends Component {
  constructor() {
    super();
    this.state = {
      theme: themes.dark,
      themeColor: themesColor.default,
      toggleTheme: this.toggleTheme,
      changeThemeColor: this.changeThemeColor
    };
  }

  toggleTheme = () => {
    this.setState(prevState => ({
      theme: prevState.theme === themes.light ? themes.dark : themes.light
    }));
  };

  changeThemeColor = themeColor => {
    this.setState({ themeColor });
  };

  render() {
    const { theme, themeColor } = this.state;
    return (
      <SkinContext.Provider value={this.state}>
        <ThemeProvider theme={theme} themeColor={themeColor}>
          <React.Fragment>
            {/* Global CSS */}
            <GlobalStyle theme={theme} themeColor={themeColor} />
            {/* Main HTML */}
            <MainWrappContainer className="iz-root">
              <Header />
              <MainWrapp>
                <Container>
                  <Columns>
                    <Columns.Column
                      mobile={{ size: 12 }}
                      tablet={{ size: 12 }}
                      desktop={{ size: 8 }}
                    >
                      {/* render VideoList with Filter (left), VideoDetail with Comments */}
                      <Switch>
                        <Route exact path="/" component={VideoSearchResult} />
                        <Route path={`/watch`} component={VideoShow} />
                      </Switch>
                    </Columns.Column>

                    <Columns.Column
                      mobile={{ size: 12 }}
                      tablet={{ size: 12 }}
                      desktop={{ size: 4 }}
                    >
                      {/* render VideoList (right) */}
                      <Route
                        path={`/watch`}
                        render={() => <VideoList layout={1} />}
                      />
                    </Columns.Column>
                  </Columns>
                </Container>
              </MainWrapp>
            </MainWrappContainer>
          </React.Fragment>
        </ThemeProvider>
      </SkinContext.Provider>
    );
  }
}

export default App;
