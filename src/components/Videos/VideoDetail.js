import React from 'react';
import { connect } from 'react-redux';

import { ytIsChanel, ytIsPlaylist } from '../../helper';

import {
  VideoFrameWrapper,
  VideoIframe,
  VideoInfoWrapper,
  VideoDes
} from './styled';


const VideoDetail = ({ selectedVideo }) => {
  if (!selectedVideo) {
    return <div>Pls search and choose one video.</div>
  }

  if (selectedVideo.id.kind === ytIsChanel) {
    return <div>Chanel: {selectedVideo.snippet.channelTitle}</div>
  }

  if (selectedVideo.id.kind === ytIsPlaylist) {
    return <div>Playlist: Chưa làm playlist ^^!!</div>
  }

  return (
    <div className="iz-video-show">
      <VideoFrameWrapper>
        <VideoIframe src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}></VideoIframe>
      </VideoFrameWrapper>
      
      <VideoInfoWrapper>
        <VideoDes dangerouslySetInnerHTML={{ __html: selectedVideo.snippet.title }}></VideoDes>
      </VideoInfoWrapper>
    </div>
  );
}

const mapStateToProps = state => {
  return { selectedVideo: state.videosReducer.selectedVideo }
}

export default connect(mapStateToProps)(VideoDetail);