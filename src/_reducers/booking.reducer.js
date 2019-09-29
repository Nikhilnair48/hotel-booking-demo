import { bookingConstants } from '../_constants';

export function booking(state = {}, action) {
    switch(action.type) {
        case bookingConstants.GET_HOTELS_BY_ORIGIN_REQUEST:
            return Object.assign({}, state, { isFetching: true });
            break;
        case bookingConstants.GET_HOTELS_BY_ORIGIN_SUCCESS:
            state = {
                ...state,
                ...action.booking.currentBooking,
                ...action.booking.response,
                isFetching: false
            };
            return Object.assign({}, state);
        case bookingConstants.GET_HOTELS_BY_ORIGIN_FAILURE:
            state = {
                ...state,
                ...action.error.response,
                isFetching: false
            }
            return Object.assign({}, state);
        default:
            return state;
    }
}