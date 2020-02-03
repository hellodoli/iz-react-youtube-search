import React from "react";
import { connect } from "react-redux";

import { ytIsVideo } from "../../helper";

import CommentItem from "./CommentItem";
import CommentWriter from "./CommentWriter";

const Comments = props => {
  const {
    isSignedIn,
    selectedVideo,
    userProfile,
    authResponse,
    comments,
    fetchComments
  } = props;

  return (
    <div className="iz-video-comments" style={{ marginTop: "2rem" }}>
      {isSignedIn && selectedVideo.kind === ytIsVideo ? (
        <CommentWriter
          selectedVideo={selectedVideo}
          userProfile={userProfile}
          authResponse={authResponse}
          fetchComments={fetchComments}
        />
      ) : null}

      <div>
        {comments.length > 0 &&
          comments.map(comment => {
            const repliesComments = comment.replies
              ? comment.replies.comments
              : [];
            return (
              <CommentItem
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
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  selectedVideo: state.videosReducer.selectedVideo,
  isSignedIn: state.oauthReducer.isSignedIn,
  userProfile: state.oauthReducer.profile,
  authResponse: state.oauthReducer.authResponse
});

export default connect(mapStateToProps)(Comments);
