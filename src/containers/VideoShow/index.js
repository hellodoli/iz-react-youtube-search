import React, { Component } from "react";

import { connect } from "react-redux";

import {
  changeLayout,
  selectVideo,
  fetchVideoById
} from "../../actions/videos";

// Components
import Comments from "../../components/Comments";
import {
  VideoDetail,
  VideoDetailNull,
  VideoNotFound
} from "../../components/Videos";

class VideoShow extends Component {
  state = {
    isValidLink: true,
    isLoading: true
  };

  fetchData = async videoId => {
    //this.setState({ isLoading: true });
    await this.props.fetchVideoById(videoId);
    this.setState({ isLoading: false });
  };

  loadVideo = () => {
    const searchParamString = this.props.location.search;
    const searchParam = new URLSearchParams(searchParamString);

    if (searchParam.has("v")) {
      const videoId = searchParam.get("v");
      if (videoId.trim() !== "") {
        this.fetchData(videoId);
        this.props.changeLayout(1); // change layout 1 mean is playing detail
      } else {
        this.setState({ isValidLink: false, isLoading: false });
      }
    } else {
      this.setState({ isValidLink: false, isLoading: false });
    }
  };

  componentDidMount() {
    this.loadVideo();
  }

  componentWillUnmount() {
    this.props.selectVideo(null);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.search !== this.props.location.search) {
      this.setState({ isValidLink: true, isLoading: true });
      this.loadVideo();
    }
  }

  render() {
    const { isValidLink, isLoading } = this.state;
    const { selectedVideo } = this.props;
    if (!isValidLink) return <VideoNotFound />;
    if (isLoading) {
      return <VideoDetailNull />;
    } else {
      if (selectedVideo) {
        return <VideoDetail video={selectedVideo} />;
      }
      return <VideoNotFound />;
    }
  }
}

const mapStateToProps = state => ({
  selectedVideo: state.videosReducer.selectedVideo
});

export default connect(mapStateToProps, {
  changeLayout,
  selectVideo,
  fetchVideoById
})(VideoShow);
