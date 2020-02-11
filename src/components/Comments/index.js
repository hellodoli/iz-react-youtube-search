import React from "react";

import { connect } from "react-redux";

import { ytIsVideo } from "../../helper";

// Components
import LoadMoreComment from "./LoadMoreComment";
import CommentItem from "./CommentItem";
import CommentWriter from "./CommentWriter";

import { CommentParentWrapper, CommentWrapper } from "./styled";

const _Comments = ({
  isSignedIn,
  selectedVideo,
  comments,
  ...rest // rest: userProfile, authResponse, fetchComments
}) => {
  return (
    <CommentParentWrapper>
      {/* Comment Writer */}
      {isSignedIn && selectedVideo.kind === ytIsVideo ? (
        <CommentWriter {...rest} selectedVideo={selectedVideo} />
      ) : null}

      {/* Comment List */}
      <CommentWrapper>
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
      </CommentWrapper>
    </CommentParentWrapper>
  );
};

const mapStateToProps = state => ({
  selectedVideo: state.videosReducer.selectedVideo,
  isSignedIn: state.oauthReducer.isSignedIn,
  userProfile: state.oauthReducer.profile,
  authResponse: state.oauthReducer.authResponse
});

const Comments = connect(mapStateToProps)(_Comments);

export { LoadMoreComment, Comments };
