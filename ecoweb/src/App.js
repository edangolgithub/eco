import React, { Component } from 'react';
import './App.css';
import EcoNav from './EcoNav'

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react'

Amplify.configure(aws_exports);

class App extends Component {
  render() {
    return (
      <div className="App">
       
       <div style={{ width: "25%" }}>
        {/* <AmplifySignOut  />    */}
       </div>
       <EcoNav />
      </div>
    );
  }
}

export default withAuthenticator(App)