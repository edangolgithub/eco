import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import Home from './Home'
import Inventory from './InventoryList'
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
                        <Nav>
                            <Nav.Link href="#NgoApi"></Nav.Link>
                            <Nav.Link eventKey={2} href="#memes">
                                
                        </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/inventory">
                            <Inventory />
                        </Route>
                        
                    </Switch>
                </Router>

            </div>
        );
    }
}

export default MainMenu;