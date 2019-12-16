import { SIGN_IN, SIGN_OUT } from '../constants/oauth';

const INTIAL_STATE = {
  isSignedIn: null,
  userId: null
}

const oauthReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null };
    default:
      return state;
  }
}

export default oauthReducer;