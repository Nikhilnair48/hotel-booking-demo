import { docCLient } from '../AWS';

export const bookingService = {
    findHotels
}

async function findHotels(destinationDetails) {

    let response = await fetch("hotelList.json", { method: "GET" });
    if(response) {
        let responseJSON = await response.json();
        if(responseJSON.hotelList.length > 0) {
            return { status: 200, hotels: responseJSON.hotelList.filter(hotel => hotel.hotelAddress.city.toLowerCase() === destinationDetails.destination.toLowerCase()) };
        } else {
            return { status: 404, message: "We couldn't find hotels in that destination. Please try another destination!" }
        }
    } else {
        return { status: 500, message: "The service is currently down. Please try again later." }
    }
}