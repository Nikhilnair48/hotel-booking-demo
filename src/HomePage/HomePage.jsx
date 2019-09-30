import React from 'react';
import { connect } from 'react-redux';

import { bookingActions } from '../_actions';

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            booking: {
                startDate: '',
                endDate: '',
                destination: ''
            }
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            <div className="container-fluid">
                <div className={"form-container"}>
                    <div className="form-background"></div>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group'}>
                            <label>Destination</label>
                            <input type="text" className="form-control" name="destination" value={booking.destination} onChange={this.handleChange} />
                        </div>
                        <div className={'form-group'}>
                            <label>Start Date</label>
                            <input type="date" className="form-control" name="startDate" value={booking.startDate} onChange={this.handleChange} />
                        </div>
                        <div className={'form-group'}>
                            <label>End Date</label>
                            <input type="date" className="form-control" name="endDate" value={booking.endDate} onChange={this.handleChange} />
                        </div>
                        <button className="btn btn-primary" name="/booking" onClick={this.handleSubmit}>Search</button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapState(state) {
    return state;
}

const actionCreators = {
    findHotels: bookingActions.findHotels
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);

export { connectedHomePage as HomePage}