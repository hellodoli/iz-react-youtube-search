import { SIGN_IN, SIGN_OUT } from '../constants/oauth';

export const signIn = (userId) => ({
  type: SIGN_IN,
  payload: userId
});

export const signOut = () => ({
  type: SIGN_OUT
});
