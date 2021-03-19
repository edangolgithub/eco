const AWS = require('aws-sdk')
console.log(process.env)
console.log(process.env.AWS_ACCESS_KEY_ID)
AWS.config.update({
    secretAccesKey: process.env.AWS_SECRET_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: "us-east-1",
});
var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18', region: "us-east-1", accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
});

const USER_POOL_ID = 'us-east-1_iSsP86zqY'

var params = {
    UserPoolId: USER_POOL_ID, /* required */

};
cognitoidentityserviceprovider.listGroups(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
        console.log('Groups list:')
        data.Groups.forEach(groups => {
            console.log(groups.GroupName)
        })

        data.Groups.forEach(groupEntity => {
            var params = {
                GroupName: groupEntity.GroupName, /* required */
                UserPoolId: USER_POOL_ID, /* required */
            };
            cognitoidentityserviceprovider.listUsersInGroup(params, function (err1, data1) {
                if (err1) console.log(err1, err1.stack); // an error occurred
                else {
                    console.log(`${groupEntity.GroupName} has ${data1.Users.length} users`);

                    data1.Users.forEach(userEntity => {
                        console.log(userEntity.Username)
                        console.log(userEntity.Attributes.find(a=>a.Name==="email").Value)
                    })
                }
            });

        })
    }
});


export const Apple=()=>{

     console.log("h1")
    cognitoidentityserviceprovider.listUsers(params, (err, data) => {
        if (err) {
            console.log(err);
            console.log("h2")
        }
        else {
            console.log("data", data);
            console.log("h3")
        }
    })
    console.log("h4")
}
//Apple();