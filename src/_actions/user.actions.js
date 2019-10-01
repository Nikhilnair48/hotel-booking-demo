import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions, bookingActions, navigatorActions } from './';
import { history, resetHistory } from '../_helpers';

export const userActions = {
    login,
    logout,
    register
};

function login(username, password) {
    return async function(dispatch) {

        dispatch(request({ username }));

        let response = await userService.login(username, password);
        
        if(response.status < 200 || response.status > 205) {
            dispatch(failure( { ...response } ));
        }
        else {
            dispatch(success( { ...response } ));
        }
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

// TO DO: REVIEW LOGIC
function logout(user) {
    return async function(dispatch) {

        dispatch(request(user));

        // IMPLEMENT & TEST isSessionActive & UNCOMMENT the if/else block
        // if(userService.isSessionActive()) {
        let response = await userService.logout(user);
        if(response.status < 200 || response.status > 205) {
            dispatch(failure( { ...response } ));
        }
        else {
            dispatch(success( { ...response } ));
            // TO CONSIDER: MOVE THIS TO APP.JSX?
            history.push("/");
            resetHistory();
        }
        // } else {
        //     dispatch(failure({status: 404, message: "There isn't an existing session!"}));
        // }
    }
    
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function register(user) {
    return async function(dispatch) {
        dispatch(request(user));

        let response = await userService.register(user);
        if(response.status < 200 || response.status > 205) {
            dispatch(failure( { ...response } ));
        } else {
            dispatch(success( { ...response } ));
        }
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}