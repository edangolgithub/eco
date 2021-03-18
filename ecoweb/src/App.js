import logo from './logo.svg';
import './App.css';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

async function signUp() {
  try {
      const { user } = await Auth.signUp({
          username,
          password,
          attributes: {
              email,          // optional
              phone_number,   // optional - E.164 number convention
              // other custom attributes 
          }
      });
      console.log(user);
  } catch (error) {
      console.log('error signing up:', error);
  }
}
async function confirmSignUp() {
  try {
    await Auth.confirmSignUp(username, code);
  } catch (error) {
      console.log('error confirming sign up', error);
  }
}
async function signIn() {
  try {
      const user = await Auth.signIn(username, password);
  } catch (error) {
      console.log('error signing in', error);
  }
}
async function resendConfirmationCode() {
  try {
      await Auth.resendSignUp(username);
      console.log('code resent successfully');
  } catch (err) {
      console.log('error resending code: ', err);
  }
}
async function signOut() {
  try {
      await Auth.signOut();
  } catch (error) {
      console.log('error signing out: ', error);
  }
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <button onClick={() => signIn()}>Sign In</button>
    </div>
  );
}

export default App;
