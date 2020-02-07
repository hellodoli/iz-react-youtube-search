import React, { Component } from "react";

import { connect } from "react-redux";

import { ytIsVideo } from "../../helper";

// Components
import { IZButton } from "../Buttons";
import CommentItem from "./CommentItem";
import CommentWriter from "./CommentWriter";

import { CommentParentWrapper, CommentWrapper } from "./styled";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.items = [];
  }

  render() {
    const {
      isSignedIn,
      selectedVideo,
      userProfile,
      authResponse,
      comments,
      fetchComments,
      fetchMoreComment
    } = this.props;
    return (
      <CommentParentWrapper className="iz-video-comments">
        {isSignedIn && selectedVideo.kind === ytIsVideo ? (
          <CommentWriter
            selectedVideo={selectedVideo}
            userProfile={userProfile}
            authResponse={authResponse}
            fetchComments={fetchComments}
          />
        ) : null}

        <CommentWrapper>
          {comments.length > 0 &&
            comments.map((comment, i) => {
              const repliesComments = comment.replies
                ? comment.replies.comments
                : [];
              this.items[i] = React.createRef();
              return (
                <CommentItem
                  ref={this.items[i]}
                  key={comment.id}
                  comment={comment.snippet.topLevelComment.snippet}
                  replyCount={comment.snippet.totalReplyCount}
                >
                  {repliesComments.length > 0 &&
                    repliesComments.map(comment => (
                      <CommentItem key={comment.id} comment={comment.snippet} />
                    ))}
                </CommentItem>
              );
            })}
        </CommentWrapper>

        <div className="has-text-centered">
          {comments.length > 0 && (
            <IZButton onClick={fetchMoreComment}>Load more comment</IZButton>
          )}
        </div>
      </CommentParentWrapper>
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
