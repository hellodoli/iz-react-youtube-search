import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentsAPI from '../../apis/comments';
import CommentItem from './CommentItem';

class Comments extends Component {

  constructor () {
    super();
    this.state = {
      commentsAPI: new CommentsAPI(),
      comments: []
    }
  }

  getCommentsByVideoId = async (videoId) => {
    const { commentsAPI } = this.state;
    await commentsAPI.getCommentsByVideoId(videoId);
    if (commentsAPI.comments.items.length > 0) {
      this.setState({ comments: commentsAPI.comments.items });
    } else {
      this.setState({ comments: [] });
    }
  }

  componentDidMount () {
    const { videoId } = this.props.selectedVideo.id;
    this.getCommentsByVideoId(videoId);
  }

  render () {
    const { comments } = this.state;
    console.log(comments);
    return (
      <div className="iz-comments-video">
        {comments && comments.length > 0 && comments.map(comment =>
          <CommentItem key={comment.id} comment={comment.snippet.topLevelComment.snippet} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedVideo: state.videosReducer.selectedVideo
});

export default connect(mapStateToProps)(Comments);