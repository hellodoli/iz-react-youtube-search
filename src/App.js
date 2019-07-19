import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Container, Columns } from 'react-bulma-components';

import Header from './containers/Header';
import Filter from './components/Filter';
import VideoList from './components/Videos/VideosList';
import VideoDetail from './components/Videos/VideoDetail';

import Videos from './apis/videos';

import styled from 'styled-components';

const MainWrapp = styled.main`
    margin-top: 60px;
    padding: 40px 0;
`;

class App extends Component {

    constructor() {
        super();
        this.state = {
            videosAPI: new Videos(),
            videos: [],
            isLoadingVideo: false,
            isVideoSearchThumb: true
        }
    }

    searchVideo = async (search) => {
        const { videosAPI } = this.state;
        this.setState({ isLoadingVideo: true });
        await videosAPI.searchVideo(search);

        this.setState({
            isLoadingVideo: false,
            videos: videosAPI.videos.items
        });
        console.log(this.state.videos);
    }

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

    onFormSubmit = (value) => {
        this.searchVideo(value);
    }

    onFilterVideo = (value,params) => {
        this.filterVideo(value,params);
    }

    render() {

        const { videos, isVideoSearchThumb, isLoadingVideo } = this.state;
        const { layout } = this.props;

        return(
            <div>

                <Header onFormSubmit={this.onFormSubmit} />

                <MainWrapp>
                    <Container>
                        <Columns>

                            <Columns.Column size={8}>

                                { (layout === 0 && videos.length > 0)
                                    ? <Filter onFilterVideo={this.onFilterVideo} />
                                    : null
                                }
                                
                                { layout === 0
                                    ? isLoadingVideo
                                        ? <div>Loading...</div>
                                        : videos.length > 0
                                            ? <VideoList isVideoSearchThumb={isVideoSearchThumb} videos={videos} />
                                            : <div>Pls search and choose one video ^^.</div>
                                    : <VideoDetail />
                                }

                            </Columns.Column>

                            <Columns.Column size={4}>
                                { layout === 1 
                                    ? <VideoList isVideoSearchThumb={isVideoSearchThumb} videos={videos} />
                                    : null
                                }
                            </Columns.Column>

                        </Columns>
                    </Container>
                </MainWrapp>

            </div>
            
        );
    }
}

const mapStateToProps = state => {
    return { layout: state.videos.changeLayoutReducer }
}

export default connect(mapStateToProps)(App);