import React from 'react';
import { connect } from 'react-redux';
import { bookingActions } from '../_actions';
import { history } from '../_helpers';

class HotelPage extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            booking: {
                startDate : '',
                endDate : '',
                totalGuests : ''
            },
            preventBooking: true
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderHotelDetails = this.renderHotelDetails.bind(this);
        this.areRoomsAvailable = this.areRoomsAvailable.bind(this);
        this.canEnableBookingButton = this.canEnableBookingButton.bind(this);
    }

    componentWillMount() {
        this.setState({
            booking: {
                endDate: this.props.booking.searchCriteria.endDate,
                startDate: this.props.booking.searchCriteria.startDate,
            }
        })
    }

    handleChange(e) {
        const { name, value } = e.target;
        const { booking } = this.state;

        this.setState({
            booking: {
                ...booking,
                [name]: value
             }
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        alert("Booking complete! We'll send you the details shortly.");
        history.push("/")
    }

    canEnableBookingButton() {
        // BASIC CHECKS BEFORE ENABLING THE BOOK BUTTON
        if(this.state.booking.endDate && this.state.booking.startDate && this.state.booking.totalGuests > 0) {
            return false;
        }
        return true;
    }

    areRoomsAvailable(event) {
        let guestsSelected = parseInt(event.target.value);
        let availableRooms = this.props.booking.hotel.hotelRooms.filter(room => room.roomMaxGuests);
        
        // RUDIMENTARY APPRAOCH  TO DETERMINING IF THE SELECTED NUMBER OF GUESTS CAN BE HANDLED BY THE HOTEL.
        // SHOULD IDEALLY CHECK THE MINIMUM NUMBER OF ROOMS REQUIRED TO ACCOMODATE THE GUESTS
        if(availableRooms && availableRooms.length > 0 && guestsSelected > availableRooms[0].roomMaxGuests) {
            alert("The hotel is unable to accomodate " + guestsSelected + " guests currently! Please check out other hotels");
        } else {
            this.handleChange(event);
        }
    }

    renderHotelDetails() {
        return (
            <div className="hotel-description col-sm-5 col-md-5 col-lg-5">
                <h4>{this.props.booking.hotel.hotelName}</h4>
                <h6>User rating: {this.props.booking.hotel.hotelUserRating}</h6>
                <h5>Facilities</h5>
                <ul>
                    {
                        this.props.booking.hotel.hotelFacilities.map(facility => {
                            return (
                                <li key={facility}>{facility}</li>
                            )
                        })
                    }
                </ul>
                <h5>Contact:</h5> 
                <span>Telephone: {this.props.booking.hotel.hotelTelephone}</span>
            </div>
        )
    }

    render() {
        const { booking } = this.state;
        return (
            <div className="page-container">
                <div className="hotel-image embed-responsive embed-responsive-16by9">
                    <img className="embed-responsive-item" src="https://a.hwstatic.com/image/upload/f_auto,q_auto,w_1900,h_500,c_fill,g_center,e_sharpen,e_improve,e_vibrance:60/v1/propertyimages/4/4916/59.jpg" />
                </div>
                <div className="hotel-details row">
                    {this.renderHotelDetails()}
                    <div className="booking-details col-sm-5 col-md-5 col-lg-5">
                        <form name="form" onSubmit={this.handleSubmit}>
                            <div className={'form-group'}>
                                <label>Start Date</label>
                                <input type="date" className="form-control" name="startDate" value={this.state.booking.endDate} onChange={this.handleChange} />
                            </div>
                            <div className={'form-group'}>
                                <label>End Date</label>
                                <input type="date" className="form-control" name="endDate" value={this.state.booking.startDate} onChange={this.handleChange} />
                            </div>
                            <div className={'form-group'}>
                                <label>Total guests</label>
                                <select className="form-control" name="totalGuests" value={this.state.booking.totalGuests} onChange={this.areRoomsAvailable}>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>
                            <button disabled={this.canEnableBookingButton()} className="btn btn-primary" name="/booking" onClick={this.handleSubmit}>Book</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

function mapState(state) {
    const { booking } = state;
    const { user } = state.authentication;

    return { booking, user};
}

const actionCreators = {
    completeBooking: bookingActions.completeBooking
}

const connectedHotelPage = connect(mapState, actionCreators)(HotelPage);

export { connectedHotelPage as HotelPage}