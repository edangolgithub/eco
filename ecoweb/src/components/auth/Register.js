import React, { Component } from 'react';
import FormErrors from "./FormErrors";
import Validate from "./FormValidation";
//import axios from 'axios'
import { signUp } from './user-management';

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    name:"",
    address:"",
    errors: {
      cognito: null,
      blankfield: false,
      passwordmatch: false
    }
  }

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false,
        passwordmatch: false
      }
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    // Form validation
    this.clearErrorState();
    const error = Validate(event, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error }
      });
    }

    // AWS Cognito integration here

    const { username, email, password ,name,address} = this.state;
    console.log(username)
    console.log(email)


    try {
      // const signUpResponse = await
      //   axios.post('https://nkys95a4t0.execute-api.us-east-1.amazonaws.com/Prod/cognito',
      //     {
      //       username: username,
      //       password: password,
      //       email: email,
      //       fun: "signup"
      //     });
          const signUpResponse = await
          signUp(username,password,email,name,address)
     // console.log(this.props.history);
      //console.log(signUpResponse.data.name);
      console.log(signUpResponse);
     
      if (signUpResponse.name === "UsernameExistsException") {
        alert("User Name exists")
      }
      else {
        this.props.history.push("/Welcome");
      }

    } catch (error) {
      let err = null;
      !error.message ? err = { "message": error } : err = error;
      this.setState({
        errors: {
          ...this.state.errors,
          cognito: err
        }
      });
    }
    // try {
    //   const signUpResponse = await Auth.signUp({
    //     username,
    //     password,
    //     attributes: {
    //       email: email
    //     }
    //   });
    //   this.props.history.push("/welcome");
    //   console.log(signUpResponse);
    // } catch (error) {
    //   let err = null;
    //   !error.message ? err = { "message": error } : err = error;
    //   this.setState({
    //     errors: {
    //       ...this.state.errors,
    //       cognito: err
    //     }
    //   });
    // }


  }

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  }

  render() {
    return (

        <div className="container">
          <h1>Register</h1>
          <FormErrors formerrors={this.state.errors} />

          <form onSubmit={this.handleSubmit}>
          <div className="container mx-auto card ig p-3" style={{width:"400px"}} >
            <div className="form-group">
              
                <input
                   className="form-control"
                  type="text"
                  id="username"
                  aria-describedby="userNameHelp"
                  placeholder="Enter username"
                  value={this.state.username}
                  onChange={this.onInputChange}
                />
             
            </div>
            <div className="form-group">
            
                <input
                   className="form-control"
                  type="email"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
             
            </div>
            <div className="form-group">
            
                <input
                   className="form-control"
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
             
            </div>
            <div className="form-group">
             
                <input
                   className="form-control"
                  type="password"
                  id="confirmpassword"
                  placeholder="Confirm password"
                  value={this.state.confirmpassword}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              
            </div>
            <div className="form-group">
             
                <input
                   className="form-control"
                  type="text"
                  id="name"
                  placeholder="Full Name"
                  value={this.state.name}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              
            </div>
            <div className="form-group">
             
                <input
                   className="form-control"
                  type="text"
                  id="address"
                  placeholder="Address"
                  value={this.state.address}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              
            </div>
            <div className="form-group">
              <p className="control">
                <button className="btn btn-primary">
                  Register
                </button>
              </p>
            </div>
           </div>
          </form>
        </div>
  
    );
  }
}

export default Register;