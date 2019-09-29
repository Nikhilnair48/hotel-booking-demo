import { history } from '../_helpers';
import { bookingConstants } from '../_constants';
import { bookingService } from '../_services';

export const bookingActions = {
    findHotels
};

function findHotels(searchCriteria) {
    
    return async function(dispatch) {
        dispatch(request({ searchCriteria }));

        let response = await bookingService.findHotels(searchCriteria);

        if(response.status < 200 || response.status > 205) {
            dispatch(failure({ response }));
        } else {
            // IN ADDITION TO THE LIST OF HOTELS IN RESPONSE, KEEP currentBooking UP-TO-DATE TO ENSURE THAT THE DATA
            // FROM THE searchCriteria IS CARRIED OVER UNTIL THE BOOKING IS COMPLETE
            const hotels = {
                response,
                currentBooking: { searchCriteria : searchCriteria }
            };
            dispatch(success(hotels));
        }
    }

    function request(origin) { return { type: bookingConstants.GET_HOTELS_BY_ORIGIN_REQUEST, origin } }
    function success(booking) { return { type: bookingConstants.GET_HOTELS_BY_ORIGIN_SUCCESS, booking } }
    function failure(error) { return { type: bookingConstants.GET_HOTELS_BY_ORIGIN_FAILURE, error } }
}