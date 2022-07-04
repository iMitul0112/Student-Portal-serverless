const AWS = require("aws-sdk");
const { adminCreateUser, jwtDecode, createResponse } = require("../common");

const USERS_TABLE = process.env.USERS_TABLE;
const docClient = new AWS.DynamoDB.DocumentClient();

const handler = async (event, res) => {
  console.log("EVENT DETAILS", JSON.stringify(event));
  const { queryStringParameters = false } = event
  console.log('queryStringParameters', queryStringParameters)
  const obj = await jwtDecode(event)

  const body1 = event.body;
  const body = JSON.parse(body1);
  const email = body.email;
  const classNo = body.classNo;
  if (obj.userId == 'students') {
    const response = {
      statusCode: 400,
      body: JSON.stringify({ message: 'YOU ARE NOT ALLOWED TO UPDATE' })
    }
    return response;
  }
  else {
    const params = {
      ExpressionAttributeNames: {
        "#S1R": "Sem-1-Result",
        '#Y1R': "Year-1-Report",
        '#W1R': "Workshop-1-Report",
        '#CNO': "classNo"
      },
      ExpressionAttributeValues: {
        ":s": body.SemResult,
        ":y": body.YearReport,
        ":w": body.WorkshopReport,
        ":c": classNo
      },
      Key: {
        "userId": queryStringParameters.id
      },
      ReturnValues: "ALL_NEW",
      TableName: USERS_TABLE,
      // UpdateExpression: "SET #S1R = :s, #Y1R = :y, #W1R = :w, #CNO = :c"
      UpdateExpression: "SET #CNO = :c, #S1R = :s, #Y1R = :y, #W1R = :w"
    }

    const results = await docClient.update(params).promise()
    // var params = {
    //   UserAttributes: [ 
    //     {
    //       Name: 'STRING_VALUE', 
    //       Value: 'STRING_VALUE'
    //     },
    //   ],
    //   UserPoolId: 'STRING_VALUE', 
    //   Username: 'STRING_VALUE', 
    //   ClientMetadata: {
    //     '<StringType>': 'STRING_VALUE',
    //   }
    // };
    // cognitoidentityserviceprovider.adminUpdateUserAttributes(params, function(err, data) {
    //   if (err) console.log(err, err.stack);
    //   else     console.log(data);
    // });
    const response = {
      statusCode: 200,
      body: JSON.stringify(results)
    }
    return response;
  }
}

module.exports.handler = handler;