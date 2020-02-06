import React, { Component } from "react";

import { connect } from "react-redux";

import { Link } from "react-router-dom";

import { ytIsChanel, ytIsPlaylist } from "../../helper";

import { changeLoadingVideoStatus } from "../../actions/search";
import { changeLayout, fetchMoreVideos } from "../../actions/videos";

import { SpinnerCircle } from "../../components/Loading";

import {
  VideoThumbWrapp,
  VideoThumbImage,
  VideoThumbContent,
  VideoThumbDes
} from "./styled";

function VideoItem({ video, layout, changeLayout }) {
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
}

class VideoList extends Component {
  state = {
    isLoadingMore: false
  };

  loadMoreVideo = async () => {
    this.setState({ isLoadingMore: true });
    await this.props.fetchMoreVideos(
      this.props.search,
      this.props.nextPageToken,
      this.props.filterParams
    );
    this.setState({ isLoadingMore: false });
  };

  scrollLoadMore = () => {
    const windowHeight = window.innerHeight;
    const windowScrollHeight = document.documentElement.scrollHeight; // height when append Video List
    const windowScrollTop = window.pageYOffset;
    const set = windowHeight + windowScrollTop;
    if (set >= windowScrollHeight) {
      console.log("yes, load more please");
      this.loadMoreVideo();
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.scrollLoadMore);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollLoadMore);
  }

  renderLoadingMore = () => {
    if (this.state.isLoadingMore) return <SpinnerCircle size={30} />;
    return null;
  };

  render() {
    const { videos, ...rest } = this.props;
    return (
      <div className="iz-video-list-search">
        {videos.map((video, index) => (
          <VideoItem
            key={index + 1}
            video={video}
            {...rest} // { layout, changeLayout }
          />
        ))}
        {/* render Loading More */}
        {this.renderLoadingMore()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  layout: state.videosReducer.layout,
  videos: Object.values(state.videosReducer.videos[1]),
  search: state.searchReducer.searchValue,
  nextPageToken: state.videosReducer.videos[0],
  filterParams: state.videosReducer.filterParams
});

export default connect(mapStateToProps, {
  changeLayout,
  changeLoadingVideoStatus,
  fetchMoreVideos
})(VideoList);
