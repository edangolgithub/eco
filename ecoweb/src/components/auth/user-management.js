const cog = require("./config.json")
global.fetch = require("node-fetch");
const Cognito = require("amazon-cognito-identity-js");


const userPool = new Cognito.CognitoUserPool({
    // UserPoolId: process.env.USER_POOL_ID,
    // ClientId: process.env.USER_POOL_CLIENT_ID

    UserPoolId: cog.UserPoolId,
    ClientId: cog.ClientId
});


export const signUp = (username, password, email, name, address) =>
    new Promise((resolve, reject) => {
        var attributeList = [];
        var attributeName = new Cognito.CognitoUserAttribute({ Name: 'name', Value: name });
        var attributeAddress = new Cognito.CognitoUserAttribute({ Name: 'address', Value: address })
        var attributeEmail = new Cognito.CognitoUserAttribute({ Name: 'email', Value: email });
        attributeList.push(attributeEmail);
        attributeList.push(attributeAddress);
        attributeList.push(attributeName);
        console.log(username)

        userPool.signUp(username, password, attributeList, null, (err, result) => {
            if (err) {
                console.log(err)
                reject(err);
            } else {
                console.log(err)
                resolve(result);
            }
        })
    });

// export const signIn = async (username, password) =>
//     new Promise((resolve, reject) => {
//         const authenticationDetails = new Cognito.AuthenticationDetails({
//             Username: username,
//             Password: password
//         });

//         const cognitoUser = new Cognito.CognitoUser({
//             Username: username,
//             Pool: userPool
//         });

//         cognitoUser.authenticateUser(authenticationDetails, {
//             //  onSuccess: result => resolve(result.getIdToken().getJwtToken()),
//             onSuccess: result => resolve(result),
//             onFailure: reject => console.log(reject)
//         });
//     });

export const signIn = async (username, password) => {
    var authenticationData = {
        Username: username,
        Password: password,
    };
    var authenticationDetails =
        new Cognito.AuthenticationDetails(authenticationData);


    var userData = {
        Username: username,
        Pool: userPool
    };
    var cognitoUser = new Cognito.CognitoUser(userData);
    return new Promise((resolve, reject) =>
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: result => {resolve(result)
           
            },
            onFailure: err => reject(err)
        }))
}


// const forgotPasswordu = (username, email) =>
//     new Promise((resolve, reject) => {
//         console.log(email)
//         const userData = {
//             Username: username,
//             Pool: userPool
//         }
//         const user = new Cognito.CognitoUser(userData);
//         user.forgotPassword(email, (error, result) =>
//             error ? reject(error) : resolve(result)
//         )

//     }
//     );
// const forgotPasswordSubmitu = (username, email, verificationcode, newpassword) =>
//     new Promise((resolve, reject) => {
//         const userData = {
//             Username: username,
//             Pool: userPool
//         }
//         const user = new Cognito.CognitoUser(userData);
//         console.log(user)
//         console.log(verificationcode)
//         console.log(newpassword)
//         user.confirmPassword(verificationcode, newpassword, (error, result) =>
//             error ? reject(error) : resolve(result)
//         )
//     }
//     );


export const currentSession = () =>{
  return new Promise((resolve, reject) => {      
        userPool.getCurrentUser((error, result) =>
            error ? reject(error) : resolve(result)
        )
    }
    )};

export const xyz=()=>{
    const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser != null) {
    cognitoUser.getSession((err, session) => {
      if (err) {
        console.log(err);
      } else if (!session.isValid()) {
        console.log("Invalid session.");
      } else {
        console.log("IdToken: " + session.getIdToken().getJwtToken());
      }
    });
  } else {
    console.log("User not found.");
  }
}

// const getCurrentUser = () =>
//     new Promise((resolve, reject) => {
//         userPool.getCurrentUser((error, result) =>
//             error ? reject(error) : resolve(result)
//         )
//     }
//     );
// const listUsers = () =>
//     new Promise((resolve, reject) => {
//         userPool.listUsers((error, result) =>
//             error ? reject(error) : resolve(result)
//         )
//     }
//     );
