import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Columns } from 'react-bulma-components';

import Header from './containers/Header';
import Filter from './components/Filter';
import VideoList from './components/Videos/VideosList';
import VideoDetail from './components/Videos/VideoDetail';
import { SpinnerCircle } from './components/Loading';

import Videos from './apis/videos';

import { themes, SkinContext } from "./skin-context";

/* Some custom CSS */
import styled from 'styled-components';

const MainWrapp = styled.main`
    margin-top: 56px;
    padding: 40px 0;
`;

const MainWrappContainer = styled.div`

    ${ ({ theme }) =>
        `
            width: 100vw;
            font-size: 16px;
            font-weight: 400;
            color: ${theme.text};
            background: ${theme.background};
            line-height: 1.5;
    `}

    .container{
        padding: 0 15px;

        @media screen and (min-width: 576px) and (max-width: 767px)  {
            max-width: 540px;
        }

        @media screen and (min-width: 768px) and (max-width: 991px){
            max-width: 720px;
        }

        @media screen and (min-width: 992px) and (max-width: 1023px){
            max-width: 960px;
        }
    }
`;

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
            theme: themes.main,
            toggleTheme: this.toggleTheme
        }
    }

    //--- skin Context
    static contextType = SkinContext;

    toggleTheme = () => {
        this.setState(prevState => ({
            theme: 
                prevState.theme === themes.main
                    ? themes.dark
                    : themes.main
        }));
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
        console.log(this.state.videos);
    }

    changeResetFilter = () => {
        this.setState({ resetFilter: false });
    }

    onFilterVideo = (value,params) => {
        this.filterVideo(value,params);
    }

    scrollLoadMoreVideoList = () => {
        if(this.state.videos.length > 0) {
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

        const { videos, isLoadingVideo, isLoadingMoreVideo, resetFilter } = this.state;
        const { layout } = this.props;
        let theme = this.context.theme;
        console.log('theme: ',theme);

        return(
            <SkinContext.Provider value={this.state}>
                <SkinContext.Consumer>
                    { ({ theme }) =>
                        <MainWrappContainer theme={theme}>

                            <Header onFormSubmit={this.onFormSubmit} />

                            <MainWrapp>
                                <Container>
                                    <Columns>

                                        <Columns.Column
                                            mobile= {{ size: 12 }}
                                            tablet= {{ size: 12 }}
                                            desktop= {{ size: 8 }}
                                        >
                                        
                                            { ( layout === 0 && videos.length > 0 )
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

                                            { (layout === 0 && isLoadingMoreVideo) && <SpinnerCircle size={30} /> }
                                                
                                        </Columns.Column>

                                        <Columns.Column
                                            mobile= {{ size: 12 }}
                                            tablet= {{ size: 12 }}
                                            desktop= {{ size: 4 }}
                                        >
                                            { layout === 1 ? <VideoList videos={videos} /> : null }
                                            { (layout === 1 && isLoadingMoreVideo) && <SpinnerCircle size={30} /> }
                                        </Columns.Column>

                                    </Columns>
                                </Container>
                            </MainWrapp>

                        </MainWrappContainer>
                    }
                </SkinContext.Consumer>                         
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