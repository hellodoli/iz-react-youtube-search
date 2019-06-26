import React from 'react';
import { connect } from 'react-redux';

import {
    VideoIframe,
    VideoInfoWrapper,
    VideoDes
} from './styled';

const VideoDetail = ({ selectedVideo }) => {
    
    if(!selectedVideo) {
        return <div>Pls search and choose one video.</div>
    }

    if(selectedVideo.channelId) {
        return <div>Chanel: {selectedVideo.snippet.channelTitle}</div>
    }

    return(
        <div id="video-wrapper">
            <VideoIframe src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}></VideoIframe>

            <VideoInfoWrapper>
                <VideoDes>{selectedVideo.snippet.title}</VideoDes>
            </VideoInfoWrapper>
            
        </div>
    )
}

const mapStateToProps = state => {
    return { selectedVideo: state.videos.selectedVideosReducer }
}

export default connect(mapStateToProps)(VideoDetail);