import React, { Component } from "react";

import { connect } from "react-redux";

import CommentsAPI from "../../apis/comments";

import { selectVideo, fetchVideoById } from "../../actions/videos";

// Components
import {
  VideoDetail,
  VideoDetailNull,
  VideoNotFound
} from "../../components/Videos";
import Comments from "../../components/Comments";

class VideoShow extends Component {
  state = {
    isValidLink: true,
    isLoadingVideo: true,

    isLoadingComment: true,
    isLoadedComments: false,

    commentsAPI: new CommentsAPI(),
    comments: []
  };

  fetchVideo = async videoId => {
    await this.props.fetchVideoById(videoId);
    this.setState({ isLoadingVideo: false });
  };

  fetchComments = async videoId => {
    if (this.props.isSignedIn !== null) {
      this.setState({ isLoadedComments: true });
      const { commentsAPI } = this.state;
      await commentsAPI.getCommentsByVideoId(videoId, this.props.authResponse);
      if (commentsAPI.comments && commentsAPI.comments.items.length > 0) {
        this.setState({
          comments: commentsAPI.comments.items,
          isLoadingComment: false
        });
      } else {
        this.setState({ comments: [], isLoadingComment: false });
      }
    }
  };

  setStateInvalidLink = () => {
    this.setState({
      isValidLink: false,
      isLoadingVideo: false,
      isLoadingComment: false
    });
  };

  setStateDefault = () => {
    this.setState({
      isValidLink: true,
      isLoadingVideo: true,
      isLoadingComment: true,
      comments: []
    });
  };

  loadVideoAndComment = () => {
    const searchParamString = this.props.location.search;
    const searchParam = new URLSearchParams(searchParamString);

    if (searchParam.has("v")) {
      const videoId = searchParam.get("v");
      if (videoId.trim() !== "") {
        this.videoId = videoId; // save video Id
        this.fetchVideo(videoId); // fetch Video
        this.fetchComments(videoId); // fetch Comment
      } else {
        // set state when invalid
        this.setStateInvalidLink();
      }
    } else {
      // set state when invalid
      this.setStateInvalidLink();
    }
  };

  componentDidMount() {
    this.loadVideoAndComment();
  }

  componentWillUnmount() {
    this.props.selectVideo(null);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.search !== this.props.location.search) {
      this.setStateDefault(); // reset state default
      this.loadVideoAndComment();
    }

    // after define user login or not, fetch comments
    if (!this.state.isLoadedComments) {
      this.fetchComments(this.videoId);
    }
  }

  // render
  renderVideoDetail = () => {
    if (this.state.isLoadingVideo) {
      return <VideoDetailNull />;
    } else {
      if (this.props.selectedVideo) {
        return <VideoDetail video={this.props.selectedVideo} />;
      }
      return <VideoNotFound />;
    }
  };

  renderComments = () => {
    if (this.state.isLoadingComment) return null; // return loading is better
    if (this.props.selectedVideo) {
      return (
        <Comments
          comments={this.state.comments}
          fetchComments={this.fetchComments}
        />
      );
    }
    return null; // return when videoId dont match
  };

  render() {
    if (!this.state.isValidLink) return <VideoNotFound />;
    return (
      <div>
        {/* render VideoDetail*/}
        {this.renderVideoDetail()}

        {/* render Comments */}
        {this.renderComments()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedVideo: state.videosReducer.selectedVideo,
  authResponse: state.oauthReducer.authResponse,
  isSignedIn: state.oauthReducer.isSignedIn
});

export default connect(mapStateToProps, {
  selectVideo,
  fetchVideoById
})(VideoShow);
