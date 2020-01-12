import React from "react";
import { connect } from "react-redux";

import { ytIsChanel, ytIsPlaylist } from "../../helper";

import { selectVideo, changeLayout } from "../../actions/videos";

import {
  VideoThumbWrapp,
  VideoThumbImage,
  VideoThumbContent,
  VideoThumbDes
} from "./styled";

const VideoItem = ({ video, layout, selectVideo, changeLayout }) => {
  const isPlaylist = video.id.kind === ytIsPlaylist ? true : false;
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
      <VideoThumbImage
        layout={layout}
        isChanel={isChanel}
        isPlaylist={isPlaylist}
      >
        <img
          src={thumbnail && thumbnail.medium.url}
          alt={video.snippet.title}
        />
      </VideoThumbImage>

      <VideoThumbContent layout={layout}>
        <h3 dangerouslySetInnerHTML={{ __html: video.snippet.title }}></h3>
        <p>{video.snippet.channelTitle}</p>
        {layout === 0 && (
          <VideoThumbDes>{video.snippet.description}</VideoThumbDes>
        )}
      </VideoThumbContent>
    </VideoThumbWrapp>
  );
};

const VideoList = ({ videos, layout, selectVideo, changeLayout }) => {
  return (
    <div className="iz-video-list-search">
      {videos.map((video, index) => (
        <VideoItem
          key={index + 1}
          video={video}
          layout={layout}
          changeLayout={changeLayout}
          selectVideo={selectVideo}
        />
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  selectedVideo: state.videosReducer.selectedVideo,
  layout: state.videosReducer.changeLayout
});

export default connect(mapStateToProps, {
  selectVideo,
  changeLayout
})(VideoList);
