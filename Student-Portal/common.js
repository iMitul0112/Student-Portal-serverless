const AWS = require("aws-sdk");
const jwt_decode = require("jwt-decode");
const docClient = new AWS.DynamoDB.DocumentClient();
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
const { env: { USERS_TABLE, USERPOOL_ID } } = process

const adminCreateUser = async (username, group, username1) => {
    console.log("^^^^6");
    const params = { 
        UserPoolId: USERPOOL_ID, 
        Username: username 
      };
      const STUDENTUSER = await cognitoidentityserviceprovider.adminCreateUser(params).promise()
        try {
          var params3 = {
            GroupName: group, 
            UserPoolId: USERPOOL_ID, 
            Username: username 
          };
          const ADDTOGROUP = await cognitoidentityserviceprovider.adminAddUserToGroup(params3).promise()
          var params1 = {
            UserPoolId: USERPOOL_ID,
            Username: username1
          };
          const User = await cognitoidentityserviceprovider.adminGetUser(params1).promise();
          console.log(STUDENTUSER, "DATA");
          const response = {
            statusCode: 200,
            body: JSON.stringify(STUDENTUSER),
            }
            return response, STUDENTUSER;
        } catch (error) {
            return error;
        } 
}

const jwtDecode = async (event) => {
    const token = event.headers.Authorization;
    const decode = jwt_decode(token);
    const userId = decode['cognito:groups'][0];
    const username1 = decode['cognito:username'];
    const response2 = {userId, username1};
    return response2;
}

const createResponse = (statusCode, body) => {
  return {
      statusCode,
      body: JSON.stringify(body)
  }
}

module.exports = {
    adminCreateUser,
    jwtDecode,
    createResponse
}