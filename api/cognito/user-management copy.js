const cog =require('./config.json')
global.fetch = require("node-fetch");
const Cognito = require("amazon-cognito-identity-js");

//console.log(cog)
const userPool = new Cognito.CognitoUserPool({
    // UserPoolId: process.env.USER_POOL_ID,
    // ClientId: process.env.USER_POOL_CLIENT_ID

    UserPoolId: cog.UserPoolId,
    ClientId: cog.ClientId
});
const userData = {
    Username: "edangol",
    Pool: userPool
}
const user=new Cognito.CognitoUser(userData);

console.log(user)
exports.signUp = (username, password, email) =>
    new Promise((resolve, reject) => {
        var attributeList = [];
        var attributeName = new Cognito.CognitoUserAttribute({ Name: 'name', Value: 'evan dangol' });
        var attributeAddress = new Cognito.CognitoUserAttribute({ Name: 'address', Value: 'khusibu' })
        var attributeEmail = new Cognito.CognitoUserAttribute({ Name: 'email', Value: email });
        attributeList.push(attributeEmail);
        attributeList.push(attributeAddress);
        attributeList.push(attributeName);
        console.log(username)
        userPool.signUp(username, password, attributeList, null, (error, result) =>
            error ? reject(error) : resolve(result)
        )
    }
    );

exports.signIn = (username, password) =>
    new Promise((resolve, reject) => {
        const authenticationDetails = new Cognito.AuthenticationDetails({
            Username: username,
            Password: password
        });

        const cognitoUser = new Cognito.CognitoUser({
            Username: username,
            Pool: userPool
        });

        cognitoUser.authenticateUser(authenticationDetails, (error, result) =>
        error ? reject(error) : resolve(result)
        )
        // cognitoUser.authenticateUser(authenticationDetails, {
        //     //  onSuccess: result => resolve(result.getIdToken().getJwtToken()),
        //     onSuccess: result => resolve(result),
        //     onFailure: reject
        // });
    });

exports.forgotPassword = (email) =>
    new Promise((resolve, reject) => {
        console.log(email)
        user.forgotPassword(email, (error, result) =>
            error ? reject(error) : resolve(result)
        )
    }
    );
exports.forgotPasswordSubmit = (email, verificationcode, newpassword) =>
    new Promise((resolve, reject) => {
        user.confirmPassword(verificationcode, newpassword, (error, result) =>
            error ? reject(error) : resolve(result)
        )
    }
    );

exports.currentSession= () =>
    new Promise((resolve, reject) => {
        userPool.currentSession((error, result) =>
            error ? reject(error) : resolve(result)
        )
    }
    );

exports.getCurrentUser= () =>
    new Promise((resolve, reject) => {
        userPool.getCurrentUser((error, result) =>
            error ? reject(error) : resolve(result)
        )
    }
    );
    exports.listUsers = () =>
    new Promise((resolve, reject) => {
        userPool.listUsers((error, result) =>
            error ? reject(error) : resolve(result)
        )
    }
    );
