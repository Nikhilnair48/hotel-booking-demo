import { userConstants } from '../_constants';

export function authentication(state = {}, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        sessionActive: false,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        sessionActive: true,
        ...action.user
      };
    case userConstants.LOGIN_FAILURE:
      return { 
        sessionActive: false, 
        user: action.user
      };
    case userConstants.LOGOUT:
      return {
        sessionActive: false
      };
    default:
      return state;
  }
}