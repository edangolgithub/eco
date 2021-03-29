import React, { Component } from 'react';

// import { AmplifySignOut } from '@aws-amplify/ui-react';
// import { Auth } from '@aws-amplify/auth';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

class MainMenu extends Component {
   
        state = {
            user: []
        }
    // componentDidMount()
    // {
    //      Auth.currentAuthenticatedUser()
    //      .then(data=>{
    //         console.log(data)
    //         this.setState({user:data})
    //         })
    //         .catch(err =>{ 
    //             this.setState({user:[]})
    //             console.log(err)}
    //             );
    // }
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
                            <Nav.Link href="#AddInventory">Add Inventory</Nav.Link>
                            <NavDropdown title="More" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="http://ecolawnlandscaping.com/">Eco lawn</NavDropdown.Item>
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
                                Hello {this.props.auth.user.idToken.payload["cognito:username"]}

                                {/* {console.log(this.props.auth.user.data)} */}
                                </span>
                            )}
                        </span>
                        <Nav>
                            {/* {
                                this.state.user &&
                                <AmplifySignOut />
                            } */}
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