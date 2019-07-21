import React, { Component } from 'react';
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
            resetFilter: false
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

    changeResetFilter = () => {
        this.setState({ resetFilter: false });
    }

    onFormSubmit = (value) => {
        this.setState({ resetFilter: true });
        this.searchVideo(value);
    }

    onFilterVideo = (value,params) => {
        this.filterVideo(value,params);
    }

    render() {

        const { videos, isLoadingVideo, resetFilter } = this.state;
        const { layout } = this.props;

        return(
            <div>

                <Header onFormSubmit={this.onFormSubmit} />

                <MainWrapp>
                    <Container>
                        <Columns>

                            <Columns.Column size={8}>

                                { ( layout === 0 && videos.length > 0 )
                                    ? <Filter 
                                        changeResetFilter={this.changeResetFilter}
                                        resetFilter={resetFilter}

                                        onFilterVideo={this.onFilterVideo} />
                                    : null
                                }
                                
                                { layout === 0
                                    ? isLoadingVideo
                                        ? <div>Loading...</div>
                                        : videos.length > 0
                                            ? <VideoList videos={videos} />
                                            : <div>Pls search and choose one video ^^.</div>
                                    : <VideoDetail />
                                }

                            </Columns.Column>

                            <Columns.Column size={4}>
                                { layout === 1 
                                    ? <VideoList videos={videos} />
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