import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ThemeProvider } from 'styled-components';
import { Container, Columns } from 'react-bulma-components';

// Components
import Header from './containers/Header';
import Filter from './components/Filter';
import VideoList from './components/Videos/VideosList';
import VideoDetail from './components/Videos/VideoDetail';
import { SpinnerCircle } from './components/Loading';

import Videos from './apis/videos';

// Theme Context
import { themes, themesColor, SkinContext } from "./skin-context";

/* Some custom CSS */
import GlobalStyle from './styled/GlobalStyle';
import { MainWrapp, MainWrappContainer } from './styled';

class App extends Component {

    constructor() {
        super();
        this.state = {
            videosAPI: new Videos(),
            videos: [],
            nextPageToken: '',
            isLoadingVideo: false,
            isLoadingMoreVideo: false,
            resetFilter: false,

            theme: themes.light,
            themeColor: themesColor.default,
            toggleTheme: this.toggleTheme,
            changeThemeColor: this.changeThemeColor
        }
    }

    //--- skin Context
    static contextType = SkinContext;

    toggleTheme = () => {
        this.setState(prevState => ({
            theme:
                prevState.theme === themes.light
                    ? themes.dark
                    : themes.light
        }));
    }

    changeThemeColor = themeColor => {
        this.setState({ themeColor });
    }

    //--- Search Function
    searchVideo = async (search) => {
        const { videosAPI } = this.state;
        this.setState({ isLoadingVideo: true });
        await videosAPI.searchVideo(search);

        this.setState({
            isLoadingVideo: false,
            videos: videosAPI.videos.items,
            nextPageToken: videosAPI.videos.nextPageToken
        });

        console.log('items: ', this.state.videos);
        console.log('nextPageToken: ', this.state.nextPageToken);
    }

    loadMoreVideo = async () => {
        const { videosAPI, nextPageToken } = this.state;
        this.setState({ isLoadingMoreVideo: true });
        const search = this.props.search; // search value
        await videosAPI.searchVideo(search,nextPageToken);
        var videoLoadMore = videosAPI.videos.items;
        this.setState({
            isLoadingMoreVideo: false,
            nextPageToken: videosAPI.videos.nextPageToken,
            videos: [...this.state.videos, ...videoLoadMore]
        });
        console.log('videoLoadMore: ', videoLoadMore);
        console.log('nextPageToken: ', this.state.nextPageToken);
    }

    onFormSubmit = (value) => {
        this.setState({ resetFilter: true });
        this.searchVideo(value);
    }

    //--- Filter Function
    filterVideo = async (search,params) => {
        const { videosAPI } = this.state;
        this.setState({ isLoadingVideo: true });
        await videosAPI.customSearchVideo(search,params);
        
        this.setState({
            isLoadingVideo: false,
            videos: videosAPI.videos.items
        });
        console.log(videosAPI.videos);
    }

    changeResetFilter = () => {
        this.setState({ resetFilter: false });
    }

    onFilterVideo = (value,params) => {
        this.filterVideo(value,params);
    }

    scrollLoadMoreVideoList = () => {
        if(this.state.videos.length > 0 && !this.state.isLoadingVideo) {
            var windowHeight = window.innerHeight;
            var windowScrollHeight = document.documentElement.scrollHeight;
            var windowScrollTop = window.pageYOffset;
            var set = windowHeight + windowScrollTop;
            if(set >= windowScrollHeight) this.loadMoreVideo();
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.scrollLoadMoreVideoList);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll',this.scrollLoadMoreVideoList);
    }

    render() {

        const { 
            videos, 
            isLoadingVideo,
            isLoadingMoreVideo, 
            resetFilter,

            theme,
            themeColor,
        } = this.state;

        const { layout } = this.props;
        
        return(
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
                                            mobile= {{ size: 12 }}
                                            tablet= {{ size: 12 }}
                                            desktop= {{ size: 8 }}
                                        >
                                            
                                            { layout === 0 && videos.length > 0
                                                ? <Filter
                                                    changeResetFilter={this.changeResetFilter}
                                                    resetFilter={resetFilter}
                                                    onFilterVideo={this.onFilterVideo} />
                                                : null
                                            }
                                            
                                            { layout === 0
                                                ? isLoadingVideo
                                                    ? <SpinnerCircle size={40} />
                                                    : videos.length > 0
                                                        ? <VideoList videos={videos} />
                                                        : <div>Pls search and choose one video ^^.</div>
                                                : <VideoDetail />
                                            }

                                            { layout === 0 && isLoadingMoreVideo ? <SpinnerCircle size={30} /> : null }

                                        </Columns.Column>

                                        <Columns.Column
                                            mobile= {{ size: 12 }}
                                            tablet= {{ size: 12 }}
                                            desktop= {{ size: 4 }}
                                        >
                                            { layout === 1 ? <VideoList videos={videos} /> : null }
                                            { layout === 1 && isLoadingMoreVideo ? <SpinnerCircle size={30} /> : null }
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

const mapStateToProps = state => {
    return { 
        layout: state.videos.changeLayoutReducer,
        search: state.search.changeValueSearchReducer
    }
}

export default connect(mapStateToProps)(App);