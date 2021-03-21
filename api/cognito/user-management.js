global.fetch = require("node-fetch");
const Cognito = require("amazon-cognito-identity-js");

const userPool = new Cognito.CognitoUserPool({
    // UserPoolId: process.env.USER_POOL_ID,
    // ClientId: process.env.USER_POOL_CLIENT_ID

    UserPoolId: "us-east-1_bFZyY3rig",
    ClientId: "3f1t8fugsnens3a5f5knnc9358"
});

exports.signUp = (username, password, email) =>
    new Promise((resolve, reject) => {
        var attributeList = [];
        var attributeName = new Cognito.CognitoUserAttribute({ Name : 'name',Value : 'evan dangol'});
        var attributeAddress =new Cognito.CognitoUserAttribute({ Name : 'address',Value : 'khusibu'})
        var attributeEmail = new Cognito.CognitoUserAttribute({ Name : 'email',Value : email});
        attributeList.push(attributeEmail); 
        attributeList.push(attributeAddress);
        attributeList.push(attributeName);
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

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: result => resolve(result.getIdToken().getJwtToken()),
            onFailure: reject
        });
    });