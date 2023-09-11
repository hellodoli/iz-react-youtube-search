import React from 'react'

import { ytIsChanel, ytIsPlaylist } from '../../helper'

import { SpinnerCircle } from '../Loading'

import {
  VideoFrameWrapper,
  VideoIframe,
  VideoInfoWrapper,
  VideoDes,
} from './styled'

export const VideoDetailNull = () => (
  <div className="iz-video-show">
    <VideoFrameWrapper isNull={true}>
      <SpinnerCircle size={40} />
    </VideoFrameWrapper>
  </div>
)

export const VideoNotFound = () => <div>Rất tiếc, không tìm thấy video.</div>

export const VideoDetail = ({ video: { id, kind, title, channelTitle } }) => {
  if (kind === ytIsChanel) {
    return <div>Chanel: {channelTitle}</div>
  }

  if (kind === ytIsPlaylist) {
    return <div>Playlist: Chưa làm playlist ^^!!</div>
  }

  return (
    <div className="iz-video-show">
      <VideoFrameWrapper>
        <VideoIframe src={`https://www.youtube.com/embed/${id}`}></VideoIframe>
      </VideoFrameWrapper>

      <VideoInfoWrapper>
        <VideoDes dangerouslySetInnerHTML={{ __html: title }}></VideoDes>
      </VideoInfoWrapper>
    </div>
  )
}
