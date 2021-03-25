'use strict';

module.exports.hello = async (event) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify('Hey it works'),
    headers: { 'Access-Control-Allow-Origin': '*' }
  };
  return response;



  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
