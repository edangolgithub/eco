import conf from './config.json'
var aws = require('aws-sdk');

aws.config.update({
    region: 'us-east-1',
    credentials: new aws.CognitoIdentityCredentials({
        IdentityPoolId: conf.IdentityPoolId
    })
});

var cog = new aws.CognitoIdentityServiceProvider();

export const listGroups = async () => {
    var params = {
        UserPoolId: conf.UserPoolId,
    }
    await cog.listGroups(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
            return err;
        } // an error occurred
        else {
            console.log(data);
            return data;
        }        
    })
    
}


export const test = async () => {
    var params = {
        UserPoolId: conf.UserPoolId, /* required */
        AttributesToGet: [
            'email',
            /* more items */
        ],

    };
    await cog.listUsers(params, function (err, data) {
        if (err) {

            console.log(err, err.stack);
            return err;
        } // an error occurred
        else {
            console.log(data);
            return data;
        }             // successful response
    });

}