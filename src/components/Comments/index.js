import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ytIsVideo } from '../../helper';

import CommentsAPI from '../../apis/comments';
import CommentItem from './CommentItem';
import CommentWriter from './CommentWriter';

class Comments extends Component {
  constructor () {
    super();
    this.state = {
      commentsAPI: new CommentsAPI(),
      comments: [],
    }
  }

  getCommentsByVideoId = async (videoId) => {
    const { commentsAPI } = this.state;
    await commentsAPI.getCommentsByVideoId(videoId, this.props.authResponse);
    if (commentsAPI.comments.items.length > 0) {
      this.setState({ comments: commentsAPI.comments.items });
    } else {
      this.setState({ comments: [] });
    }
  }

  componentDidMount () {
    const { kind, videoId } = this.props.selectedVideo.id;
    if (kind === ytIsVideo) {
      this.getCommentsByVideoId(videoId);
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (this.props.selectedVideo.id.videoId !== nextProps.selectedVideo.id.videoId) {
      this.getCommentsByVideoId(nextProps.selectedVideo.id.videoId);
    }
    return true;
  }

  render () {
    const { comments } = this.state;
    const { userProfile, authResponse, isSignedIn, selectedVideo } = this.props;
    console.log('comments: ', comments);
    return (
      <div className="iz-video-comments" style={{ marginTop: '2rem' }}>
        { (isSignedIn && (selectedVideo.id.kind === ytIsVideo))
            ? <CommentWriter
                selectedVideo={selectedVideo}
                userProfile={userProfile}
                authResponse={authResponse}

                getCommentsByVideoId={this.getCommentsByVideoId}
              />
            : null
        }
        
        <div>
          { comments.length > 0 && comments.map(comment => {
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedVideo: state.videosReducer.selectedVideo,
  isSignedIn: state.oauthReducer.isSignedIn,
  userProfile: state.oauthReducer.profile,
  authResponse: state.oauthReducer.authResponse
});

export default connect(mapStateToProps)(Comments);