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

    if(selectedVideo.id.kind === "youtube#channel" ) {
        return <div>Chanel: {selectedVideo.snippet.channelTitle}</div>
    }

    if(selectedVideo.id.kind === "youtube#playlist") {
        return <div>Playlist: Chưa làm playlist ^^!!</div>
    }

    return( 
        <div id="videoFrame">
            <VideoIframe src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}></VideoIframe>

            <VideoInfoWrapper>
                <VideoDes>{selectedVideo.snippet.title.replace(/&quot;/g, '\"')}</VideoDes>
            </VideoInfoWrapper>
        </div>
    )
}

const mapStateToProps = state => {
    return { selectedVideo: state.videosReducer.selectedVideo }
}

export default connect(mapStateToProps)(VideoDetail);