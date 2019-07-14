import React from 'react';
import { connect } from 'react-redux';

import { 
    selectVideo, 
    changeLayout
} from "../../actions/videos";

import { 
    VideoThumbWrapp,
    VideoThumbImage,
    VideoThumbContent
} from './styled';


const VideoItem = ({ video, selectVideo, changeLayout, isVideoSearchThumb }) => (
    <VideoThumbWrapp
        isVideoSearchThumb={isVideoSearchThumb}
        onClick={() => {
            selectVideo(video);
            changeLayout(1);
        }}
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
    
const VideoList = ({ videos, selectVideo, changeLayout, isVideoSearchThumb }) => {
    
    return(
        <div className="video-list-search">
            { videos.map(video =>
                <VideoItem 
                    key={video.etag}
                    video={video}

                    changeLayout={changeLayout}
                    selectVideo={selectVideo}
                    
                    isVideoSearchThumb={isVideoSearchThumb}
                />
            )}
        </div>
    );
}

const mapStateToProps = state => {
    return { 
        selectedVideo: state.videos.selectedVideosReducer,
        layout: state.videos.changeLayoutReducer
    }
}

export default connect(
    mapStateToProps,
    {
        selectVideo, 
        changeLayout
    }
)(VideoList);