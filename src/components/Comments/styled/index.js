import styled from 'styled-components';
import { Media } from 'react-bulma-components';

export const CommentAuthorName = styled.strong`
  color: var(--color-main-title);
  font-size: .8125rem;
`

export const CommentText = styled.p`
  font-size: .875rem;
`

export const CommentMediaWrapper = styled(Media)`
  & + & {
    border-top: none;
  }
`
