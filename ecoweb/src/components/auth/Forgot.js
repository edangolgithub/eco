import cog from "./config.json"
const AmazonCognitoIdentity= require('amazon-cognito-identity-js');

export function forgotPassword(username) {   
    var data = {
        UserPoolId: cog.UserPoolId,
        ClientId: cog.ClientId
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(data);

    // setup cognitoUser first
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser({
        Username: username,
        Pool: userPool
    });
    // call forgotPassword on cognitoUser
    cognitoUser.forgotPassword( {
        onSuccess: function (result) {
            console.log('call result: ' + result);
            alert("success")
        },
        onFailure: function(err) {
            alert("Invalid code or User Name")
        },
        inputVerificationCode() {
            var verificationCode = prompt('Please input verification code ' ,'');
            var newPassword = prompt('Enter new password ' ,'');
            cognitoUser.confirmPassword(verificationCode, newPassword, this);
        }
    });
}