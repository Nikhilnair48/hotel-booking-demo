import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';

import { history } from '../_helpers';
import { HomePage } from '../HomePage';
import { HotelsList } from '../HotelsList';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.renderDynamicNav = this.renderDynamicNav(this);
    }

    renderDynamicNav() {
        return (
            <Nav className="ml-auto">
                <Nav.Item>
                    <Nav.Link onClick={() => alert("not implemented!") }>
                        Login/Register
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        )
    }
    
    render() {
        return (
            <Router history={history}>
                <div>
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
                        <Navbar.Brand href="/">The Booking Factory</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse>
                            <Nav className="ml-auto">
                                <Nav.Item>
                                    <Nav.Link onClick={() => alert("not implemented!") }>
                                        Login/Register
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/hotels" component={HotelsList} />
                </div>
            </Router>
        );
    }
}

function mapState(state) {
    return state;
}

const actionCreators = {
    
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };