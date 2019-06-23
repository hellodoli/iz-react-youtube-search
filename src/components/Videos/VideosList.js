import React from 'react';
import { connect } from 'react-redux';

import { selectVideo } from "../../actions/videos";

import { 
    VideoThumbWrapp,
    VideoThumbImage,
    VideoThumbContent
} from './styled';

const VideoItem = ({ video, selectVideo, isVideoSearchThumb }) => (
    <VideoThumbWrapp
        isVideoSearchThumb={isVideoSearchThumb}
        onClick={() => selectVideo(video)}
    >

        <VideoThumbImage>
            <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
        </VideoThumbImage>
        
        <VideoThumbContent>
            <h3>{ video.snippet.title }</h3>
            <p>{ video.snippet.channelTitle }</p>
        </VideoThumbContent>
        
    </VideoThumbWrapp>
);
    
const VideoList = ({ videos, selectVideo, isVideoSearchThumb }) => {
    
    return(
        <div>
            { videos.map(video =>
                <VideoItem 
                    key={video.etag}
                    video={video}
                    selectVideo={selectVideo}
                    
                    isVideoSearchThumb={isVideoSearchThumb}
                />
            )}
        </div>
    );
}

const mapStateToProps = state => {
    return { selectedVideo: state.videos.selectedVideosReducer }
}

export default connect(
    mapStateToProps,
    { selectVideo }
)(VideoList);