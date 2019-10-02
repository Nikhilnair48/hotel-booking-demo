import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';

import { history } from '../_helpers';
import { HomePage } from '../HomePage';
import { HotelsList } from '../HotelsList';
import { RegisterPage } from '../RegisterPage/RegisterPage';
import { LoginPage } from '../LoginPage/LoginPage';

import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.renderDynamicNav = this.renderDynamicNav.bind(this);
    }

    renderDynamicNav() {
        const user = (this.props.authentication && this.props.authentication.sessionActive) ? this.props.authentication.user : null;
        console.log(user);
        if(user && user.username) {
            return (
                <Nav className="ml-auto">
                    <NavDropdown title={ `Hey, ${user.username}` } id="collasible-nav-dropdown" alignRight>
                        <NavDropdown.Item href="#action/3.1"></NavDropdown.Item>
                        <NavDropdown.Item href="#" onClick={() => this.props.logout()}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            )
        } else {
            return (
                <Nav className="ml-auto">
                    <Nav.Item>
                        <Nav.Link onClick={() => history.push("/login")}>
                            Login/Register
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            )
        }
    }
    
    render() {
        return (
            <Router history={history}>
                <div className="hotel-demo-container">
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
                        <Navbar.Brand href="/">The Booking Factory</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse>
                            {this.renderDynamicNav()}
                        </Navbar.Collapse>
                    </Navbar>
                    <div className="hotel-demo-content">
                        <Route exact path="/" component={HomePage} updateNavbar={this.renderDynamicNav} />
                        <Route exact path="/hotels" component={HotelsList} updateNavbar={this.renderDynamicNav} />
                        <Route exact path="/login" component={LoginPage} updateNavbar={this.renderDynamicNav} />
                        <Route exact path="/register" component={RegisterPage} updateNavbar={this.renderDynamicNav}/>
                    </div>
                </div>
            </Router>
        );
    }
}

function mapState(state) {
    const { authentication } = state;
    const { booking } = state;
    return { authentication, booking };
}

const actionCreators = {
    
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };