import React from 'react';
import { connect } from 'react-redux';

import {
    VideoIframe,
    VideoInfoWrapper,
    VideoDes
} from './styled';

import { SkinContext } from '../../skin-context';

const VideoDetail = ({ selectedVideo }) => {
    
    if(!selectedVideo) {
        return <div>Pls search and choose one video.</div>
    }

    if(selectedVideo.id.kind === "youtube#channel" ) {
        return <div>Chanel: {selectedVideo.snippet.channelTitle}</div>
    }

    if(selectedVideo.id.kind === "youtube#playlist"){
        return <div>Playlist: Chưa làm playlist ^^!!</div>
    }

    return(
        <SkinContext.Consumer>
            { ({ theme }) =>
                <div id="videoFrame" className="video-frame">
                    <VideoIframe src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}></VideoIframe>

                    <VideoInfoWrapper>
                        <VideoDes theme={theme}>{selectedVideo.snippet.title.replace(/&quot;/g, '\"')}</VideoDes>
                    </VideoInfoWrapper>
                </div>
            }
        </SkinContext.Consumer>
    )
}

const mapStateToProps = state => {
    return { selectedVideo: state.videos.selectedVideosReducer }
}

export default connect(mapStateToProps)(VideoDetail);