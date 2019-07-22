import React from 'react';
import { connect } from 'react-redux';

import { 
    selectVideo, 
    changeLayout
} from "../../actions/videos";

import { 
    VideoThumbWrapp,
    VideoThumbImage,
    VideoThumbContent,
    VideoThumbDes
} from './styled';

const ytIsChanel = 'youtube#channel';

const VideoItem = ({ video, layout, selectVideo, changeLayout }) => {
    const isChanel = video.id.kind === ytIsChanel ? true : false;
    const thumbnail = video.snippet.thumbnails;
    return (
        <VideoThumbWrapp
            layout={layout}
            onClick={() => {
                selectVideo(video);
                changeLayout(1);
            }}
        >
        
            <VideoThumbImage className={isChanel && 'channel'}>
                <img src={thumbnail && thumbnail.medium.url} alt={video.snippet.title} />
            </VideoThumbImage>
            
            <VideoThumbContent layout={layout}>
                <h3>{ video.snippet.title.replace(/&quot;/g, '\"') }</h3>
                <p>{ video.snippet.channelTitle }</p>
                { layout === 0 &&
                    <VideoThumbDes>{ video.snippet.description }</VideoThumbDes>
                }
            </VideoThumbContent>
            
        </VideoThumbWrapp>
    )
};
    
const VideoList = ({ videos, layout, selectVideo, changeLayout }) => {
    
    return(
        <div className="video-list-search">
            { videos.length > 0 && videos.map(video =>
                <VideoItem 
                    key={video.etag}
                    video={video}
                    layout={layout}

                    changeLayout={changeLayout}
                    selectVideo={selectVideo}
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