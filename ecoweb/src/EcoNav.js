import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar, Nav,Form ,FormControl, Button} from 'react-bootstrap'

import {  AmplifySignOut } from '@aws-amplify/ui-react'


export class EcoNav extends Component {
    render() {
        return (
            <div>
                {/* <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#/">Navbar</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="#/">Home</Nav.Link>
                        <Nav.Link href="#/">Features</Nav.Link>
                        <Nav.Link href="#/">Pricing</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-info">Search</Button>
                    </Form>
                </Navbar>
                <br /> */}
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand href="#/">Navbar</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="#/">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-light">Search</Button>
                       <span style={{ marginLeft:"10px",height:"40px"}}><AmplifySignOut  /> </span> 
                    </Form>
                </Navbar>

                {/* <br />
                <Navbar bg="light" variant="light">
                    <Navbar.Brand href="#/">Navbar</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="#/">Home</Nav.Link>
                        <Nav.Link href="#/">Features</Nav.Link>
                        <Nav.Link href="#/">Pricing</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-primary">Search</Button>
                    </Form>
                </Navbar> */}

                <Router>
                    <Switch>
                        <Route exact path="/">                           
                        </Route>                       
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default EcoNav
