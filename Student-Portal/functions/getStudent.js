const AWS = require("aws-sdk");
const jwt_decode = require("jwt-decode");
const docClient = new AWS.DynamoDB.DocumentClient();
const { adminCreateUser, jwtDecode, createResponse } = require("../common");
const { env: { USERS_TABLE, USERPOOL_ID } } = process

const handler = async (event) => {
    console.log("EVENT DETAILS", JSON.stringify(event));
    const { queryStringParameters = false } = event
    console.log('queryStringParameters', queryStringParameters)
    //single get    
    if(queryStringParameters) {
        const obj = await jwtDecode(event)
        console.log("OBJECCCCTTT", obj.username1);
        if(queryStringParameters.id !== obj.username1)
        {
            return createResponse(400, {message: "YOU ARE NOT ALLOWED TO VIEW OTHER STUDENTS'S DATA"})
        }
        else
        {
        try {const Items = await docClient.get({
            TableName: USERS_TABLE,
            Key: {
                "userId": queryStringParameters.id
            }
            }).promise()
            console.log('Students', JSON.stringify(Items))
        return createResponse(200, { students: Items || [] })
        }
        catch(error) {
        return error
        }}
    } else {
        //get ALL
        const obj = await jwtDecode(event)
        console.log("OBJECCCCTTT", obj.userId);
        if(obj.userId == 'students')
        {
            return createResponse(400, {message: "YOU ARE NOT ALLOWED TO VIEW OTHER STUDENTS'S DATA"})
        }
        else
        {console.log("ELSE");
        const { Items } = await docClient.scan({
            TableName: USERS_TABLE
        }).promise()

        console.log('All students', JSON.stringify(Items))
        return createResponse(200, { students: Items || [] })
        }
    }
}

module.exports.handler = handler;