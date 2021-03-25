import conf from './config.json'
var aws = require('aws-sdk');

aws.config.update({
    region: 'us-east-1',
    credentials: new aws.CognitoIdentityCredentials({
        IdentityPoolId: conf.IdentityPoolId
    })
});

var cog = new aws.CognitoIdentityServiceProvider();
export const test = () =>
{
    var params = {
        UserPoolId: conf.UserPoolId, /* required */
        AttributesToGet: [
          'email',
          /* more items */
        ],
    
      };
      cog.listUsers(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
      });

}