import React from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

import { ytIsChanel, ytIsPlaylist } from "../../helper";

import { changeLayout } from "../../actions/videos";

import {
  VideoThumbWrapp,
  VideoThumbImage,
  VideoThumbContent,
  VideoThumbDes
} from "./styled";

const VideoItem = ({ video, layout, changeLayout }) => {
  const isPlaylist = video.id.kind === ytIsPlaylist;
  const isChanel = video.id.kind === ytIsChanel;
  const thumbnail = video.snippet.thumbnails;

  return (
    <VideoThumbWrapp
      layout={layout}
      onClick={() => {
        changeLayout(1);
      }}
    >
      <Link to={`/watch?v=${video.id.videoId}`}>
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
      </Link>
    </VideoThumbWrapp>
  );
};

const VideoList = props => {
  const { videos, ...rest } = props;
  return (
    <div className="iz-video-list-search">
      {videos.length > 0 &&
        videos.map((video, index) => (
          <VideoItem
            key={index + 1}
            video={video}
            {...rest} // { layout, changeLayout }
          />
        ))}
    </div>
  );
};

const mapStateToProps = state => ({
  layout: state.videosReducer.layout,
  videos: Object.values(state.videosReducer.videos[1])
});

export default connect(mapStateToProps, {
  changeLayout
})(VideoList);
