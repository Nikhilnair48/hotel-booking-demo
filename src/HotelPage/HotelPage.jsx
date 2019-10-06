import React from 'react';
import { connect } from 'react-redux';

import { bookingActions } from '../_actions';

class HotelPage extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            booking: {
                guests: '',
                endDate: '',
                startDate: ''
            }
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.setState({
            guests: '2',
            endDate: new Date().toDateString()
        });
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

        const { booking } = this.state;

        if (booking.destination && booking.startDate && booking.endDate) {
            await this.props.findHotels(booking);
            this.props.history.push("/hotels");
        }
    }

    render() {
        const { booking } = this.state;
        return (
            <div className="page-container">
                <div className="hotel-image embed-responsive embed-responsive-16by9">
                    <img className="embed-responsive-item" src="https://a.hwstatic.com/image/upload/f_auto,q_auto,w_1900,h_500,c_fill,g_center,e_sharpen,e_improve,e_vibrance:60/v1/propertyimages/4/4916/59.jpg" />
                </div>
                <div className="hotel-details">
                    <div className="hotel-description">
                        <p>Rating: </p>
                    </div>
                    <div className="booking-details">
                        <form name="form" onSubmit={this.handleSubmit}>
                            <div className={'form-group'}>
                                <label>Start Date</label>
                                <input type="date" className="form-control" name="startDate" value={booking.startDate} onChange={this.handleChange} />
                            </div>
                            <div className={'form-group'}>
                                <label>End Date</label>
                                <input type="date" className="form-control" name="endDate" value={booking.endDate} onChange={this.handleChange} />
                            </div>
                            <div className={'form-group'}>
                                <label>Total guests</label>
                                <select className="form-control" name="totalGuests" value={booking.totalGuests} onChange={this.handleChange}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>
                            <button className="btn btn-primary" name="/booking" onClick={this.handleSubmit}>Search</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

function mapState(state) {
    return state;
}

const actionCreators = {
    completeBooking: bookingActions.completeBooking
}

const connectedHotelPage = connect(mapState, actionCreators)(HotelPage);

export { connectedHotelPage as HotelPage}