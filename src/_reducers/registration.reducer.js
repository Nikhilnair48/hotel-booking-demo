import { userConstants } from '../_constants';

export function registration(state = {}, action) {
  console.log(action.user);
  let result = null;
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { loading: true };
    case userConstants.REGISTER_SUCCESS:
      result = {
        success: { ...action.user, nextRoute: '/login' },
        loading: false,
      }
      return Object.assign({}, state, result);
    case userConstants.REGISTER_FAILURE:
        result = {
        error: { ...action.error, nextRoute: '/register' },
        loading: false,
      }
      return Object.assign({}, state, result);
    default:
      return state;
  }
}