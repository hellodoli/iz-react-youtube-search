import styled from "styled-components";

export const ImageUserWrapper = styled.a.attrs(() => ({
  className: "image",
  href: "javascript:void(0)"
}))`
  height: 36px;
  width: 36px;
`;

export const UserInfoWrapper = styled.div`
  position: relative;
`;

export const UserInfoContent = styled.div`
  position: absolute;
  top: 0;
  right: calc(100% + 5px);
  min-width: 300px;
  height: 400px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-top: none;
  background: #282828;
  box-shadow: none;
`;

export const UserInfoBoard = styled.div`
  padding: 0.5rem 0;
  &:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

export const UserInfoItem = styled.a.attrs(() => ({
  href: "javascript:void(0)"
}))`
  padding-left: 1rem;
  padding-right: 2.25rem;
  color: var(--color-main-title);
  height: 40px;
  line-height: 40px;
  display: flex;

  &:hover {
    color: var(--color-main-title);
    background-color: red;
  }
`;
