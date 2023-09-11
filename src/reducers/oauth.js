import { SIGN_IN, SIGN_OUT } from '../constants/oauth'

const INTIAL_STATE = {
  isSignedIn: null,
  userId: null,
  profile: {},
  authResponse: {},
}

const oauthReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        userId: action.payload.id,
        profile: action.payload.profile,
        authResponse: action.payload.authResponse,
      }
    case SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
        userId: null,
        profile: {},
        authResponse: {},
      }
    default:
      return state
  }
}

export default oauthReducer
