const fs = require("fs")

function handler (data, serverless, options) {
    // if(data.includes('UserPoolClientID')){
        const output = JSON.parse(JSON.stringify(data));
        console.log(output, "output");
        // const obj = {
        //     UserPoolClientId: output.UserPoolClientId,
        //     UserPoolId: output.UserPoolId
        // }
        const obj = {"awsconfig": {
            "aws_cognito_region": "us-east-1",
            "aws_user_pools_id": output.UserPoolId,
            "aws_user_pools_web_client_id": output.UserPoolClientId,
            "aws_appsync_graphqlEndpoint": "https://plykzbs6q5ckxlavurtnergu5e.appsync-api.us-east-1.amazonaws.com/graphql",
            "aws_appsync_region": "us-east-1",
            "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS",
            "aws_appsync_apiKey": "da2-omadtn4grzghbhjeqanudxhbvy",
            "aws_cognito_identity_pool_id": "us-east-1:c8b2101a-5bb8-49bf-9621-e337923dbfd7",
            "aws_mandatory_sign_in": "enable",
            "clientMetadata": { "platform": "MOBILE_APP" },
            "Analytics": {
              "disabled": false,
              "autoSessionRecord": false,
              "AWSPinpoint": {
                "appId": "1dc48f2c582b43bbb1343d95051e2cc6",
                "region": "us-east-1",
                "bufferSize": 1000,
                "flushInterval": 5000,
                "flushSize": 100,
                "resendLimit": 5
              }
            },
            "Storage": {
              "AWSS3": {
                "bucket": "quickly-tasks-assets-qa",
                "region": "us-east-1"
              }
            }
          },
          "analyticsConfig": {
            "AWSPinpoint": {
              "appId": "1dc48f2c582b43bbb1343d95051e2cc6",
              "region": "us-east-1"
            }
          },
          "publicUrl": "https://quickly-tasks-assets-qa.s3.amazonaws.com/public/",
          "background_locationUrl": "https://5eflw97fz6.execute-api.us-east-1.amazonaws.com"
        }
        fs.writeFile('outputCred.json', JSON.stringify(obj, null, 4), 'utf8', function (err) {
            console.log("error", err);
        });
        console.log('Received Stack Output', output.UserPoolClientId)
    // }
}   
module.exports = { handler }