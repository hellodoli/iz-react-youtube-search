import React from 'react';
import { Media, Content } from 'react-bulma-components';
import {
  CommentMediaWrapper,
  CommentText,
  CommentAuthorName
} from './styled';

export default ({ comment : { authorProfileImageUrl, authorDisplayName, textDisplay }}) => {
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
            <CommentAuthorName>{ authorDisplayName }</CommentAuthorName>
            <CommentText>
              { textDisplay }
            </CommentText>
          </div>
        </Content>
      </Media.Item>
    </CommentMediaWrapper>
  );
}
