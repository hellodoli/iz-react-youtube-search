import React, { Component } from 'react';

import { Container, Columns } from 'react-bulma-components';

import Header from './containers/Header';
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

    onFormSubmit = (value) => {
        this.searchVideo(value);
    }

    render() {

        const { videos, isVideoSearchThumb } = this.state;

        return(
            <div>

                <Header onFormSubmit={this.onFormSubmit} />

                <MainWrapp>
                    <Container>
                        <Columns>

                            <Columns.Column size={8}>

                                <VideoDetail />

                            </Columns.Column>

                            <Columns.Column size={4}>
                                {
                                    !this.state.isLoadingVideo
                                        ? 
                                        <VideoList
                                            isVideoSearchThumb={isVideoSearchThumb}
                                            videos={videos}
                                        />
                                        : <div>Loading...</div>
                                
                                }
                            </Columns.Column>

                        </Columns>
                    </Container>
                </MainWrapp>

            </div>
            
        );
    }
}

export default App;