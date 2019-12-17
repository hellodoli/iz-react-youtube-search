import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentsAPI from '../../apis/comments';
import CommentItem from './CommentItem';

class Comments extends Component {

  constructor () {
    super();
    this.collapseRepliesButton = React.createRef();
    this.repliesSection = React.createRef();
    this.state = {
      commentsAPI: new CommentsAPI(),
      comments: [],
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

  shouldComponentUpdate (nextProps, nextState) {
    if (this.props.selectedVideo.id.videoId !== nextProps.selectedVideo.id.videoId) {
      this.getCommentsByVideoId(nextProps.selectedVideo.id.videoId);
    }
    return true;
  }

  render () {
    const { comments } = this.state;
    console.log('comments: ', comments);
    return (
      <div className="iz-video-comments" style={{ marginTop: '2rem' }}>
        {comments.length > 0 && comments.map(comment => {
          const repliesComments = comment.replies ? comment.replies.comments : [];
          return (
            <CommentItem
              key={comment.id}
              comment={comment.snippet.topLevelComment.snippet}
              replyCount={comment.snippet.totalReplyCount}
            >
              { repliesComments.length > 0 && repliesComments.map(comment =>
                <CommentItem key={comment.id} comment={comment.snippet} />
              )}
            </CommentItem>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedVideo: state.videosReducer.selectedVideo
});

export default connect(mapStateToProps)(Comments);