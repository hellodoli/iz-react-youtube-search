import React, { Component } from "react";
import { connect } from "react-redux";

// Theme Context
import { themes, themesColor, SkinContext } from "./skin-context";

import { Switch, Route } from "react-router-dom";

import { ThemeProvider } from "styled-components";
import { Container, Columns } from "react-bulma-components";

// Components
import Header from "./containers/Header";
import { VideoList } from "./components/Videos";
import { SpinnerCircle } from "./components/Loading";

// Containers
import VideoSearchResult from "./containers/VideoSearchResult";
import VideoShow from "./containers/VideoShow";

/* Some custom CSS */
import GlobalStyle from "./styled/GlobalStyle";
import { MainWrapp, MainWrappContainer } from "./styled";

import { fetchMoreVideos } from "./actions/videos";

class App extends Component {
  state = {
    isLoadingMoreVideo: false,
    theme: themes.dark,
    themeColor: themesColor.default,
    toggleTheme: this.toggleTheme,
    changeThemeColor: this.changeThemeColor
  };

  // --- skin Context
  static contextType = SkinContext;

  toggleTheme = () => {
    this.setState(prevState => ({
      theme: prevState.theme === themes.light ? themes.dark : themes.light
    }));
  };

  changeThemeColor = themeColor => {
    this.setState({ themeColor });
  };

  // --- Load more Videos when scrolling
  loadMoreVideo = async () => {
    this.setState({ isLoadingMoreVideo: true });
    await this.props.fetchMoreVideos(
      this.props.search,
      this.props.nextPageToken,
      this.props.filterParams
    );
    this.setState({ isLoadingMoreVideo: false });
  };

  scrollLoadMoreVideoList = () => {
    if (this.props.videos.length > 0 && !this.state.isLoadingVideo) {
      const windowHeight = window.innerHeight;
      const windowScrollHeight = document.documentElement.scrollHeight;
      const windowScrollTop = window.pageYOffset;
      const set = windowHeight + windowScrollTop;
      if (set >= windowScrollHeight) {
        this.loadMoreVideo();
      }
    }
  };

  componentDidMount() {
    //window.addEventListener("scroll", this.scrollLoadMoreVideoList);
  }

  componentWillUnmount() {
    //window.removeEventListener("scroll", this.scrollLoadMoreVideoList);
  }

  render() {
    const { isLoadingMoreVideo, theme, themeColor } = this.state;
    const { layout } = this.props;
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
                      <Switch>
                        <Route exact path="/" component={VideoSearchResult} />
                        <Route path={`/watch`} component={VideoShow} />
                      </Switch>

                      {/* render LoadingMoreVideo */}
                      {layout === 0 && isLoadingMoreVideo ? (
                        <SpinnerCircle size={30} />
                      ) : null}
                    </Columns.Column>

                    <Columns.Column
                      mobile={{ size: 12 }}
                      tablet={{ size: 12 }}
                      desktop={{ size: 4 }}
                    >
                      {/* render VideoList (right) */}
                      <Route path={`/watch`} component={VideoList} />

                      {/* render LoadingMoreVideo */}
                      {layout === 1 && isLoadingMoreVideo ? (
                        <SpinnerCircle size={30} />
                      ) : null}
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

const mapStateToProps = state => ({
  layout: state.videosReducer.layout,
  search: state.searchReducer.searchValue,
  videos: Object.values(state.videosReducer.videos[1]),
  nextPageToken: state.videosReducer.videos[0],
  filterParams: state.videosReducer.filterParams
});

export default connect(mapStateToProps, {
  fetchMoreVideos
})(App);
