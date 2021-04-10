import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Menu from './Menu'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Home from './components/Home'
import Inventory from './InventoryList'
import Products from './components/Products';
import ProductAdmin from './components/ProductAdmin';
import ForgotPassword from './components/auth/ForgotPassword';
import ForgotPasswordVerification from './components/auth/ForgotPasswordVerification';
import ChangePassword from './components/auth/ChangePassword';
import ChangePasswordConfirm from './components/auth/ChangePasswordConfirm';
import Welcome from './components/auth/Welcome';
import Footer from './components/Footer';
import AddInventory from './AddInventory';
import axios from 'axios'

import { currentSession } from './components/auth/user-management';
//import {test} from './components/auth/Usersdk'
// import Amplify from 'aws-amplify';
// import awsconfig from './aws-exports';
// Amplify.configure(awsconfig);
class App extends Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null,
    jwt:""
  }
  constructor()
  {
    super();
    this.checkapiauth=this.checkapiauth.bind(this)
  }

  setAuthStatus = authenticated => {
    this.setState({ isAuthenticated: authenticated });
 //   console.log("called")
  }
  setJwt = jwt => {
   
  }

  setUser = user => {
    this.setState({ user: user });
    this.setState({ jwt: user.idToken.jwtToken });
   console.log(user.idToken.jwtToken)
   console.log(user.idToken)

  }
  componentDidMount()
  {
    var session=currentSession();
    console.log(session)
  }
  checkapiauth(event)
  {
    event.preventDefault()
    var data =axios.get('https://vhkrb2owtc.execute-api.us-east-1.amazonaws.com/dev' ,{
      headers: {
        Authorization: 'Bearer ' + this.state.jwt //the token is a variable which holds the token
      }
     })
    data.then((response) => {
     alert(response.data);
    }, (error) => {
      alert(error);
    });
   }
  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser
     
    }
 //test();
    //console.log(this.state.user)
    return (

      <div className="App">
        <Menu auth={authProps} />
        {/* <button className="btn btn-danger" onClick={this.checkapiauth}>check apigateway restriction</button> */}
        <Router>
          <Switch>
            <Route exact path="/" render={(props) => <Home {...props} auth={authProps} />} />
            <Route exact path="/products" render={(props) => <Products {...props} auth={authProps} />} />
            <Route exact path="/admin" render={(props) => <ProductAdmin {...props} auth={authProps} />} />
            <Route exact path="/login" render={(props) => <Login {...props} auth={authProps} />} />
            <Route exact path="/register" render={(props) => <Register {...props} auth={authProps} />} />
            <Route exact path="/forgotpassword" render={(props) => <ForgotPassword {...props} auth={authProps} />} />
            <Route exact path="/forgotpasswordverification" render={(props) => <ForgotPasswordVerification {...props} auth={authProps} />} />
            <Route exact path="/changepassword" render={(props) => <ChangePassword {...props} auth={authProps} />} />
            <Route exact path="/changepasswordconfirmation" render={(props) => <ChangePasswordConfirm {...props} auth={authProps} />} />
            <Route exact path="/welcome" render={(props) => <Welcome {...props} auth={authProps} />} />
            <Route path="/inventory" render={(props) => <Inventory {...props} auth={authProps} />} />             
            <Route path="/AddInventory" render={(props) => <AddInventory {...props} auth={authProps} />} />             

          </Switch>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
