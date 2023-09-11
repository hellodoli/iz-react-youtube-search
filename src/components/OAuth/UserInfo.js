import React, { useState } from 'react'
import {
  UserInfoWrapper,
  ImageUserWrapper,
  UserInfoContent,
  UserInfoBoard,
  UserInfoItem,
} from './styled'

const UserBoard = ({ singInOrSignOut }) => (
  <UserInfoContent>
    {/* Header */}
    <div>
      <UserInfoBoard></UserInfoBoard>
    </div>
    {/* Body */}
    <div>
      <UserInfoBoard>
        <UserInfoItem onClick={(e) => e.preventDefault()}></UserInfoItem>
        <UserInfoItem
          onClick={(e) => {
            e.preventDefault()
            singInOrSignOut()
          }}
        >
          Click to Sign out
        </UserInfoItem>
      </UserInfoBoard>
    </div>
  </UserInfoContent>
)

const UserInfo = ({ profile, singInOrSignOut }) => {
  const { Paa: imageAvataSrc } = profile
  const [isOpen, setIsOpen] = useState(false) // state
  return (
    <UserInfoWrapper>
      <ImageUserWrapper
        onClick={(e) => {
          e.preventDefault()
          setIsOpen(!isOpen)
        }}
      >
        <img src={imageAvataSrc} className="is-rounded" alt="" />
      </ImageUserWrapper>

      {isOpen && <UserBoard singInOrSignOut={singInOrSignOut} />}
    </UserInfoWrapper>
  )
}

export default UserInfo
