import React, { useState } from "react";
import {
  UserInfoWrapper,
  ImageUserWrapper,
  UserInfoContent,
  UserInfoBoard,
  UserInfoItem
} from "./styled";

const UserBoard = ({ singInOrSignOut }) => (
  <UserInfoContent>
    {/* Header */}
    <div>
      <UserInfoBoard></UserInfoBoard>
    </div>
    {/* Body */}
    <div>
      <UserInfoBoard>
        <UserInfoItem></UserInfoItem>
        <UserInfoItem onClick={singInOrSignOut}>Click to Sign out</UserInfoItem>
      </UserInfoBoard>
    </div>
  </UserInfoContent>
);

const UserInfo = ({ profile, singInOrSignOut }) => {
  const { Paa: imageAvataSrc } = profile;
  const [isOpen, setIsOpen] = useState(false); // state
  return (
    <UserInfoWrapper>
      <ImageUserWrapper
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <img src={imageAvataSrc} className="is-rounded" alt="" />
      </ImageUserWrapper>

      {isOpen && <UserBoard singInOrSignOut={singInOrSignOut} />}
    </UserInfoWrapper>
  );
};

export default UserInfo;
