import React, { Component } from 'react'

import { connect } from 'react-redux'

import CommentsAPI from '../../apis/comments'

import { selectVideo, fetchVideoById } from '../../actions/videos'

// Components
import {
  VideoDetail,
  VideoDetailNull,
  VideoNotFound,
} from '../../components/Videos'
import { Comments, LoadMoreComment } from '../../components/Comments'

class VideoShow extends Component {
  state = {
    isValidLink: true,

    isLoadingVideo: false,

    isLoadingComment: false,
    isLoadingMoreComment: false,
    isLoadedComments: false,

    commentsAPI: new CommentsAPI(),
    comments: [],
    order: 'relevance',
    nextPageToken: null,
  }

  fetchVideo = async (videoId) => {
    this.setState({ isLoadingVideo: true })
    await this.props.fetchVideoById(videoId)
    this.setState({ isLoadingVideo: false })
  }

  fetchComments = async (videoId) => {
    if (this.props.isSignedIn !== null) {
      const { commentsAPI, isLoadedComments } = this.state

      if (!isLoadedComments) this.setState({ isLoadedComments: true })

      this.setState({ isLoadingComment: true })
      await commentsAPI.getCommentsByVideoId(
        videoId,
        this.props.authResponse,
        this.state.order,
      )
      if (commentsAPI.comments.length > 0) {
        this.setState({
          comments: commentsAPI.comments,
          nextPageToken: commentsAPI.nextPageToken,
          isLoadingComment: false,
        })
      } else {
        this.setState({
          comments: [],
          nextPageToken: null,
          isLoadingComment: false,
        })
      }
    }
  }

  fetchMoreComment = async () => {
    const { commentsAPI, order, nextPageToken } = this.state
    this.setState({ isLoadingMoreComment: true })
    await commentsAPI.getCommentsByVideoId(
      this.videoId,
      this.props.authResponse,
      order,
      nextPageToken,
    )

    if (commentsAPI.comments.length > 0) {
      const commentsOld = this.state.comments.splice('')
      this.setState({
        comments: [...commentsOld, ...commentsAPI.comments],
        nextPageToken: commentsAPI.nextPageToken,
        isLoadingMoreComment: false,
      })
    } else {
      this.setState({
        comments: [],
        nextPageToken: null,
        isLoadingMoreComment: false,
      })
    }
  }

  setStateInvalidLink = () => {
    this.setState({
      isValidLink: false,
      isLoadingVideo: false,
      isLoadingComment: false,
    })
  }

  setStateDefault = () => {
    this.setState({
      isValidLink: true,
      order: 'relevance',
    })
  }

  loadVideoAndComment = () => {
    const searchParamString = this.props.location.search
    const searchParam = new URLSearchParams(searchParamString)

    if (searchParam.has('v')) {
      const videoId = searchParam.get('v')
      if (videoId.trim() !== '') {
        this.videoId = videoId // save video Id use for next time
        this.fetchVideo(videoId) // fetch Video
        this.fetchComments(videoId) // fetch Comment
      } else {
        // set state when invalid
        this.setStateInvalidLink()
      }
    } else {
      // set state when invalid
      this.setStateInvalidLink()
    }
  }

  componentDidMount() {
    this.loadVideoAndComment()
  }

  componentWillUnmount() {
    this.props.selectVideo(null)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.search !== this.props.location.search) {
      this.setStateDefault()
      this.loadVideoAndComment()
    }

    // after first time when define user login or not, fetch comments
    if (!this.state.isLoadedComments) {
      this.fetchComments(this.videoId)
    }
  }

  // render
  renderVideoDetail = () => {
    if (this.state.isLoadingVideo) {
      return <VideoDetailNull />
    } else {
      if (this.props.selectedVideo) {
        return <VideoDetail video={this.props.selectedVideo} />
      }
      return <VideoNotFound />
    }
  }

  renderComments = () => {
    if (this.state.isLoadingComment) return null // return loading is better
    if (this.props.selectedVideo) {
      //const isShowComments = this.state.comments.length > 0 ? true : false;
      return (
        <div className="iz-video-comments">
          <Comments
            comments={this.state.comments}
            fetchComments={this.fetchComments}
          />
          {/* Load More Comment Button */}
          <LoadMoreComment
            comments={this.state.comments}
            fetchMoreComment={this.fetchMoreComment}
            isLoadingMoreComment={this.state.isLoadingMoreComment}
          />
        </div>
      )
    }
    return null // return when videoId dont match
  }

  render() {
    if (!this.state.isValidLink) return <VideoNotFound />
    return (
      <div>
        {/* render VideoDetail*/}
        {this.renderVideoDetail()}

        {/* render Comments */}
        {this.renderComments()}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  selectedVideo: state.videosReducer.selectedVideo,
  authResponse: state.oauthReducer.authResponse,
  isSignedIn: state.oauthReducer.isSignedIn,
})

export default connect(mapStateToProps, {
  selectVideo,
  fetchVideoById,
})(VideoShow)
