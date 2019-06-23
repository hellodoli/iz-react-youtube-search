import React from 'react';
import { connect } from 'react-redux';

const VideoDetail = ({ selectedVideo }) => {
    
    if(!selectedVideo) {
        return <div>Pls search and choose one video.</div>
    }

    if(selectedVideo.channelId) {
        return <div>Chanel: {selectedVideo.snippet.channelTitle}</div>
    }

    return(
        <div>
            <iframe width="420" height="345" src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}>
            </iframe>
        </div>
    )
}

const mapStateToProps = state => {
    return { selectedVideo: state.videos.selectedVideosReducer }
}

export default connect(mapStateToProps)(VideoDetail);