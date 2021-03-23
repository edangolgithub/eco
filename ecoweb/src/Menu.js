import React, { Component } from 'react';

import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

class MainMenu extends Component {
    render() {
        return (
            <div>
                <Navbar sticky="top" collapseOnSelect expand="lg" bg="light" variant="light">
                    <Navbar.Brand href="#/">
                        {/* <img height="40px" src="/images/fund.png" alt="logo" /> Home */}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#/">Home</Nav.Link>
                            <Nav.Link href="#inventory">Inventory</Nav.Link>
                            <Nav.Link href="#contact">Contact</Nav.Link>
                            <NavDropdown title="More" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1"></NavDropdown.Item>
                                <NavDropdown.Item href="#email"></NavDropdown.Item>
                                <NavDropdown.Item href="#N"></NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4"></NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <span className="">
                            {this.props.auth.isAuthenticated && this.props.auth.user && (
                                <span>
                                    {/* Hello {this.props.auth.user.username} */}
                                Hello {this.props.auth.user.data.idToken.payload["cognito:username"]}
                                </span>
                            )}
                        </span>
                        <Nav>
                            {this.props.auth.isAuthenticated && (
                                <Nav.Link href="/" onClick={this.handleLogOut} className="button is-light">
                                    Log out
                                </Nav.Link>
                            )}
                            {!this.props.auth.isAuthenticated && (
                                <Nav>
                                    <Nav.Link href="#Login">Login</Nav.Link>
                                    <Nav.Link href="#Register">Register</Nav.Link>
                                </Nav>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

            </div>


        );
    }
}

export default MainMenu;