import React, { useState } from "react";
import { Media, Content } from "react-bulma-components";
import {
  CommentMediaWrapper,
  CommentText,
  CommentAuthorName,
  CommentPublish,
  CommentMetaWrapper,
  RepliesButton
} from "./styled";
import { convertTime, converNumberLike } from "../../helper";

const CommentItem = React.forwardRef(
  ({ comment, replyCount = null, children }, ref) => {
    const {
      authorProfileImageUrl,
      authorDisplayName,
      publishedAt,
      textDisplay,
      likeCount
    } = comment; // main comment
    const [isOpen, setIsOpen] = useState(false);

    // toggle Collapse
    const collapseRepliesSection = () => {
      setIsOpen(!isOpen);
    };

    return (
      <CommentMediaWrapper>
        <Media.Item position="left">
          <figure className="image is-48x48">
            <img src={authorProfileImageUrl} alt="" className="is-rounded" />
          </figure>
        </Media.Item>
        <Media.Item position="center">
          <Content>
            <div>
              <CommentAuthorName>{authorDisplayName}</CommentAuthorName>{" "}
              <CommentPublish>{convertTime(publishedAt)}</CommentPublish>
            </div>
            <CommentText
              dangerouslySetInnerHTML={{ __html: textDisplay }}
            ></CommentText>
            <CommentMetaWrapper>
              <div>
                <i className="fas fa-thumbs-up"></i>
                <span>{converNumberLike(likeCount)}</span>
              </div>
              <div>
                <i className="fas fa-thumbs-down"></i>
                <span></span>
              </div>
            </CommentMetaWrapper>
          </Content>

          {/* Replies comments */}
          {children && children.length > 0 ? (
            <div className="iz-video-comments-replies">
              <RepliesButton onClick={collapseRepliesSection} isOpen={isOpen}>
                <span>
                  {isOpen ? `Hide replies` : `View ${replyCount} replies`}
                </span>
                <i className="fas fa-chevron-down"></i>
              </RepliesButton>
              {isOpen && <div>{children}</div>}
            </div>
          ) : null}
        </Media.Item>
      </CommentMediaWrapper>
    );
  }
);

export default CommentItem;
