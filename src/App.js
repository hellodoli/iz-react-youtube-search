import React, { Component } from "react";
import { connect } from "react-redux";

// Theme Context
import { themes, themesColor, SkinContext } from "./skin-context";

import { Switch, Route } from "react-router-dom";

import { ThemeProvider } from "styled-components";
import { Container, Columns } from "react-bulma-components";

// Components
import Header from "./containers/Header";
import Filter from "./components/Filter";
import { VideoList } from "./components/Videos";
import { SpinnerCircle } from "./components/Loading";

// Containers
import VideoShow from "./containers/VideoShow";

/* Some custom CSS */
import GlobalStyle from "./styled/GlobalStyle";
import { MainWrapp, MainWrappContainer } from "./styled";

import {
  fecthVideos,
  fetchFilterVideos,
  fetchMoreVideos,
  changeFilterParams
} from "./actions/videos";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoadingVideo: false,
      isLoadingMoreVideo: false,
      resetFilter: false,

      theme: themes.dark,
      themeColor: themesColor.default,
      toggleTheme: this.toggleTheme,
      changeThemeColor: this.changeThemeColor
    };
  }

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

  // --- Search Function
  searchVideo = async search => {
    this.setState({ isLoadingVideo: true });
    await this.props.fecthVideos(search);
    this.setState({ isLoadingVideo: false });

    console.log("items: ", this.props.videos);
    console.log("nextPageToken: ", this.props.nextPageToken);
  };

  onFormSubmit = value => {
    this.setState({ resetFilter: true });
    this.props.changeFilterParams({ type: "video" });
    this.searchVideo(value);
  };

  // --- Filter Function
  changeResetFilter = () => {
    this.setState({ resetFilter: false });
  };

  onFilterVideo = async (search, params) => {
    this.setState({ isLoadingVideo: true });
    await this.props.fetchFilterVideos(search, params);
    this.setState({ isLoadingVideo: false });
  };

  componentDidMount() {
    window.addEventListener("scroll", this.scrollLoadMoreVideoList);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollLoadMoreVideoList);
  }

  /* render layout function */
  renderFilter = () => {
    if (this.props.layout === 0 && this.props.videos.length > 0) {
      return (
        <Filter
          changeResetFilter={this.changeResetFilter}
          resetFilter={this.state.resetFilter}
          onFilterVideo={this.onFilterVideo}
        />
      );
    }
    return null;
  };

  renderVideoLayoutLeft = () => {
    const { videos } = this.props;
    if (this.state.isLoadingVideo) return <SpinnerCircle size={40} />;

    return (
      <Switch>
        <Route exact path="/" render={() => <VideoList videos={videos} />} />
        <Route path={`/watch`} component={VideoShow} />;
      </Switch>
    );
  };

  renderVideoLayoutRight = () => {
    const { layout, videos } = this.props;
    if (layout === 1) {
      return <VideoList videos={videos} />;
    }
    return null;
  };

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
              <Header onFormSubmit={this.onFormSubmit} />
              <MainWrapp>
                <Container>
                  <Columns>
                    <Columns.Column
                      mobile={{ size: 12 }}
                      tablet={{ size: 12 }}
                      desktop={{ size: 8 }}
                    >
                      {/* render Filter */}
                      {this.renderFilter()}

                      {/* render VideoShow (VideoDetail, Comments), VideoList (left) */}
                      {this.renderVideoLayoutLeft()}

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
                      {this.renderVideoLayoutRight()}

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
  layout: state.videosReducer.changeLayout,
  search: state.searchReducer.changeValue,
  videos: Object.values(state.videosReducer.videos[1]),
  nextPageToken: state.videosReducer.videos[0],
  filterParams: state.videosReducer.filterParams,
  selectedVideo: state.videosReducer.selectedVideo
});

export default connect(mapStateToProps, {
  fecthVideos,
  fetchFilterVideos,
  fetchMoreVideos,
  changeFilterParams
})(App);
