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
//import {test} from './components/auth/Usersdk'
// import Amplify from 'aws-amplify';
// import awsconfig from './aws-exports';
// Amplify.configure(awsconfig);
class App extends Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null
  }

  setAuthStatus = authenticated => {
    this.setState({ isAuthenticated: authenticated });
 //   console.log("called")
  }

  setUser = user => {
    this.setState({ user: user });
    console.log(user)
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
