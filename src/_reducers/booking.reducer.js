import { bookingConstants } from '../_constants';

export function booking(state = {}, action) {
    switch(action.type) {
        case bookingConstants.GET_HOTELS_BY_ORIGIN_REQUEST:
            return Object.assign({}, state, { isFetching: true });
        case bookingConstants.GET_HOTELS_BY_ORIGIN_SUCCESS:
            state = {
                ...state,
                ...action.booking.currentBooking,
                ...action.booking.response,
                nextRoute: '/hotels',
                isFetching: false
            };
            return Object.assign({}, state);
        case bookingConstants.GET_HOTELS_BY_ORIGIN_FAILURE:
            state = {
                ...state,
                ...action.error.response,
                nextRoute: '/',
                isFetching: false
            }
            return Object.assign({}, state);
        case bookingConstants.BOOK_HOTEL_REQUEST:
            state = {
                ...state,
                ...action.hotel,
                isFetching: true
            };
            return Object.assign({}, state);
        case bookingConstants.BOOK_HOTEL_SUCCESS:
            booking = {
                ...action.booking.currentBooking,
                searchCriteria: { ...state.searchCriteria }
            }
            state = {
                ...booking,
                success: { nextRoute: '/hotel' },
                isFetching: false
            };
            return Object.assign({}, state);
        case bookingConstants.BOOK_HOTEL_FAILURE:
            state = {
                ...state,
                ...action.error.response,
                nextRoute: '/',
                isFetching: false
            };
            return Object.assign({}, state);
        default:
            return state;
    }
}