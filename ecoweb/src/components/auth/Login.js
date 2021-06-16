import React, { Component } from 'react';
import FormErrors from "./FormErrors";
import Validate from "./FormValidation";

import { forgotPassword } from './Forgot'
import CircleLoader from '../../CircleLoader'
import { signIn } from './user-management.js'
class LogIn extends Component {
  state = {
    username: "",
    password: "",
    errors: {
      cognito: null,
      blankfield: false
    },
    loading: false
  };
  constructor() {
    super();
    this.forgot = this.forgot.bind(this)
    
  }


  forgot(event) {
    event.preventDefault();
    console.log(this.state.username)
    if (this.state.username.length < 1) {
      alert("username required")
      return;
    }
    forgotPassword(this.state.username);
  }
  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false
      }
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    //console.log("hello")
    this.setState({ loading: true })
    // Form validation
    this.clearErrorState();
    const error = Validate(event, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error }
      });
    }
    try {
      // const user = await
      //   axios.post('https://nkys95a4t0.execute-api.us-east-1.amazonaws.com/Prod/cognito',
      //     {
      //       username: this.state.username,
      //       password: this.state.password,
      //       attributes: {
      //         email: this.state.email
      //       },
      //       fun: "signin"
      //     });


      const user = await signIn(this.state.username, this.state.password)





      //console.log(user);
      //xyz();

      if (!user) {

        //console.log(user.data.message);
        this.props.auth.setAuthStatus(false);
        this.props.auth.setUser(null);
        this.setState({ loading: false })
        // alert(user.data.message)
        return;

      }
      else {
        sessionStorage.setItem("user",JSON.stringify(user));
        this.props.auth.setAuthStatus(true);
        this.props.auth.setUser(user);
        this.props.history.push("/");
      }
    }
    catch (error) {
      let err = null;
      !error.message ? err = { "message": error } : err = error;
      this.setState({
        errors: {
          ...this.state.errors,
          cognito: err
        }

      });
      this.setState({ loading: false })
    }
    // AWS Cognito integration here

    // try {
    //   const user = await Auth.signIn(this.state.username, this.state.password);
    //   console.log(user);
    //   this.props.auth.setAuthStatus(true);
    //   this.props.auth.setUser(user);
    //   this.props.history.push("/");
    // }catch(error) {
    //   let err = null;
    //   !error.message ? err = { "message": error } : err = error;
    //   this.setState({
    //     errors: {
    //       ...this.state.errors,
    //       cognito: err
    //     }
    //   });
    // }
    //this.setState({loading:false})
  };

 
  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  render() {
    return (
      <div className="container loginform mx-auto ">
        <h1>Log in</h1>
        <FormErrors formerrors={this.state.errors} />

        <form onSubmit={this.handleSubmit}>
          <div className="container mx-auto card ig p-3" style={{ width: "400px" }} >
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                id="username"
                aria-describedby="usernameHelp"
                placeholder="Enter username or email"
                value={this.state.username}
                onChange={this.onInputChange}
              />

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


            </div>
            {this.state.loading ? <CircleLoader /> :
              <div>
                <div className="form-group">


                  <button className="button form-control btn-primary">
                    Login
              </button>

                </div>
                <div className="form-group">

                  {/* <a href="#forgotpassword">Forgot password?</a> */}
                  <button className="btn btn-link" onClick={this.forgot} >Forgot password?</button>

                </div>


              </div>
            }

            {/* <button onClick={this.checkapiauth}>click</button> */}
          </div>
        </form>
      </div>

    );
  }
}

export default LogIn;