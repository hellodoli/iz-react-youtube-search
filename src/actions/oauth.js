import { SIGN_IN, SIGN_OUT } from '../constants/oauth';

export const signIn = (userInfo) => ({
  type: SIGN_IN,
  payload: userInfo
});

export const signOut = () => ({
  type: SIGN_OUT
});
