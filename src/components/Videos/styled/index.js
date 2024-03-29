import styled from 'styled-components'

/* Video List */
export const VideoThumbImage = styled.div`
  display: inline-flex;
  flex: none;
  margin-right: 1rem;

  ${({ layout }) =>
    layout === 0
      ? `
      width: 246px;
      height: 138px;
      @media (max-width: 768px) { width: 40%; height: auto; }
    `
      : `
      width: 40%;
      height: auto;
      @media (min-width: 769px) and (max-width: 1023px) {
        width: 246px;
        height: 138px;
      }
    `}

  img {
    max-width: 100%;
    height: auto;
    object-fit: cover;
    object-position: center;
  }

  ${({ isChanel }) =>
    isChanel &&
    `
    justify-content: center;
    img {
      width: 136px;
      height: 136px;
      margin: 0 auto;
      border-radius: 50%;
    }
  `}
`

export const VideoThumbDes = styled.p`
  display: block;
  padding-top: 0.5rem;
  margin-bottom: 0.5rem;
  max-height: 4.875rem;
  overflow: hidden;
  text-transform: none;
`

export const VideoThumbContent = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 60%;
  }

  & h3 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    max-height: 3.2rem;

    font-size: ${({ layout }) => (layout === 0 ? '1.125rem' : '0.875rem')};
    font-weight: 500;
    line-height: ${({ layout }) => (layout === 0 ? '1.5rem' : '1rem')};
    margin-bottom: 0.25rem;
    color: var(--color-main-title);
  }

  & p {
    font-size: 0.8125rem;
    font-weight: 400;
    line-height: 1.125rem;
    color: var(--color-text);
  }
`

export const VideoThumbWrapp = styled.div`
  & > a {
    display: flex;
    justify-content: flex-start;
    /*padding: 1.5rem;
    border-radius: 0.25rem;
    background-image: linear-gradient(
      147deg,
      var(--color-primary) 0%,
      var(--color-secondary) 74%
    );*/
    cursor: pointer;
  }
  & + & {
    margin-top: ${(props) => (props.layout === 1 ? '.5rem' : '1rem')};
  }
`

/* Video Detail */
export const VideoFrameWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;

  ${({ isNull }) =>
    isNull &&
    `
    & > div {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
    }
  `}
`

export const VideoIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
`

export const VideoInfoWrapper = styled.div`
  margin-top: 1.25rem;
`

export const VideoDes = styled.h2`
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 2.4rem;
  color: var(--color-main-title);
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`
