import styled from 'styled-components';
import { Media } from 'react-bulma-components';

export const CommentAuthorName = styled.strong`
  font-size: .8125rem;
  color: var(--color-main-title);
`

export const CommentPublish = styled.span`
  font-size: .8125rem;
`

export const CommentText = styled.p`
  font-size: .875rem;
`

export const CommentMediaWrapper = styled(Media)`
  & &,
  & + & {
    border-top: none;
  }
`

export const CommentMetaWrapper = styled.div`
  font-size: .8125rem;

  & > div {
    display: inline-flex;
    align-items: center;
  }

  & > div:not(:last-child) {
    margin-right: 1rem;
  }

  i {
    padding: .25rem;
    margin-right: .5rem;
    cursor: pointer;
    &:hover {
      color: var(--color-main-title);
    }
  }
`

export const RepliesButton = styled.div`
  font-size: .875rem;
  font-weight: 700;
  color: var(--color-main-title);
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  > span {
    margin-right: .5rem;
  }

  > i {
    ${ ({ isOpen }) => isOpen
        ? `transform: rotate(-180deg)`
        : ``
    }
  }
`
