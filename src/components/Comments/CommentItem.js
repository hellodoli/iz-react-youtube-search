import React, { useRef, useState } from 'react';
import { Media, Content } from 'react-bulma-components';
import {
  CommentMediaWrapper,
  CommentText,
  CommentAuthorName,
  CommentPublish,
  RepliesButton
} from './styled';
import { convertTime } from '../../helper';


export default ({ comment, replyCount = null, children }) => {
  const { authorProfileImageUrl, authorDisplayName, publishedAt, textDisplay } = comment; // main comment
  const [isOpen, setIsOpen] = useState(false);

  // toggle Collapse
  const collapseRepliesSection = () => {
    setIsOpen(!isOpen);
  }

  return (
    <CommentMediaWrapper>
      <Media.Item position="left">
        <figure className="image is-48x48">
          <img src={authorProfileImageUrl} className="is-rounded" />
        </figure>
      </Media.Item>
      <Media.Item position="center">
        <Content>
          <div>
            <CommentAuthorName>{ authorDisplayName }</CommentAuthorName>{' '}
            <CommentPublish>{ convertTime(publishedAt) }</CommentPublish>
          </div>
          <CommentText dangerouslySetInnerHTML={{ __html: textDisplay }}></CommentText>
        </Content>
        
        {/* Replies comments */}
        {(children && children.length > 0)
            ?
            <div>
              <RepliesButton onClick={collapseRepliesSection} isOpen={isOpen}>
                <span>{ isOpen ? `Hide replies` : `View ${replyCount} replies` }</span>
                <i className="fas fa-chevron-down"></i>
              </RepliesButton>
              { isOpen && <div className="iz-video-comments-replies">{ children }</div> }
            </div>
            : null
        }
      </Media.Item>
    </CommentMediaWrapper>
  );
}
