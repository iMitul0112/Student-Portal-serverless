const AWS = require("aws-sdk");
const {adminCreateUser, jwtDecode} = require("../common");
const USERS_TABLE = process.env.USERS_TABLE;
const docClient = new AWS.DynamoDB.DocumentClient();

const handler = async (event, res) => {
    console.log("EVENT DETAILS", JSON.stringify(event));
    const obj = await jwtDecode(event)
    // console.log(obj, "OBKJJJJJJ");
    if(obj.userId == 'students')
    {
      const response = {
        statusCode: 400,
        body: JSON.stringify({message: 'YOU ARE NOT ALLOWED TO CREATE STUDENT'})
      }
      return response;
    }
    else
    {
      const body1 = event.body;
      const body = JSON.parse(body1);
      const username = body.name;
      const password = body.password;
      const email = body.email;
      const group = 'students';
      const department = body.department;
      const classNo = body.classNo;

      console.log("STUDENTS");
    
      const result = await adminCreateUser(username, group, obj.username1);
      const userid = result.User.Username;
      const params2 = {
        TableName: USERS_TABLE,
        Item: {
            'userId': userid,
            'email': body.email,
            'department': department,
            'classNo': classNo
            }
        }   
      
        const results = await docClient.put(params2).promise()
      
        console.log("SAVED SUCCESSFULLY");
  
        const response1 = {
            statusCode: 200,
            body: JSON.stringify(result)
          };
        return response1;
    }
}

module.exports = {handler, adminCreateUser};