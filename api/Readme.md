api
serverless create --template aws-nodejs --path cognito --name cognito

serverless invoke local -f hello --data '{ "queryStringParameters": {"password":"abc","username":"evan2","email":"abc@g.com"}}'
serverless invoke local -f hello --path param.json

```
aws cognito-idp admin-set-user-password  --user-pool-id us-east-1_bFZyY3rig --username edangol2  --password gfdftg454  --permanent
  ```