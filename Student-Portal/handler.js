const AWS = require("aws-sdk");
const express = require("express");
const serverless = require("serverless-http");

// const app = express();

const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
const USERPOOL_ID = process.env.USERPOOL_ID

// app.use(express.json());

// app.get("/users/:userId", async function (req, res) {
//   const params = {
//     TableName: USERS_TABLE,
//     Key: {
//       userId: req.params.userId,
//     },
//   };

//   try {
//     const { Item } = await dynamoDbClient.get(params).promise();
//     if (Item) {
//       const { userId, name } = Item;
//       res.json({ userId, name });
//     } else {
//       res
//         .status(404)
//         .json({ error: 'Could not find user with provided "userId"' });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Could not retreive user" });
//   }
// });

// app.post("/users", async function (req, res) {
//   const { userId, name } = req.body;
//   if (typeof userId !== "string") {
//     res.status(400).json({ error: '"userId" must be a string' });
//   } else if (typeof name !== "string") {
//     res.status(400).json({ error: '"name" must be a string' });
//   }

//   const params = {
//     TableName: USERS_TABLE,
//     Item: {
//       userId: userId,
//       name: name,
//     },
//   };

//   try {
//     await dynamoDbClient.put(params).promise();
//     res.json({ userId, name });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Could not create user" });
//   }
// });

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Credentials', true)
//   res.header('Access-Control-Allow-Origin', "http://localhost:8080");
//   res.header('Access-Control-Allow-Methods', 'GET,POST');
//   res.header('Access-Control-Allow-Headers', "Content-type, Accept, X-Custom-Header");

//   try {
    
//     res.jwtpayload = jwt_decode(req.headers.authorization);
//     const group = res.jwtpayload["cognito:groups"][0];
//     switch(req.path) {
//       case
//     }

//   } catch (error) {
//     next()
//   }
// })

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Credentials', true)
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // restrict it to the required domain
//   res.header("Access-Control-Allow-Methods", "GET,POST");
//   // Set custom headers for CORS
//   res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

//   try {
//     res.jwtpayload = jwt_decode(req.headers.authorization);
//     const group = res.jwtpayload["cognito:groups"][0];
//     switch (req.path) {
//       case "/users":
//       case "/createuser":
//       case "/updatestudent":
//       case "/adddetail":
//         if (["faculty", "superadmin"].includes(group))
//           next();
//         else
//           res.status(401).json({ message: "Unauthorized" });
//         break;
//       default:
//         next();
//         break;
//     }
//   } catch (_) {
//     next()
//   }

// })

// const handler = async (event, res) => {
//   console.log("EVENT DETAILS", JSON.stringify(event));
//   const body1 = event.body;
//   const body = JSON.parse(body1);
//   const username = body.name;
//   const password = body.password;
//   const email = body.email;
//   console.log(username, password, email);
//   // return;
//   // const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
  
//   // const { email, password, type, username } = event

//   // const params = {
//   //   UserPoolId: USERPOOL_ID,
//   //   UserName: username,
//   //   TemporaryPassword: password,
//   //   UserAttributes: [
//   //     {
//   //       Name: 'email',
//   //       Value: email
//   //     },
//   //     {
//   //       Name: 'email_verified',
//   //       Value: 'True'
//   //     }
//   //   ]
//   // }
//   // if(type == "student") {
//   //   params["UserAttributes"].push({
//   //     Name: 'custom.departmentNo',
//   //     Value: (req.body)["departmentNo"]
//   //   })
//   //   params["UserAttributes"].push({
//   //     Name: ''
//   //   })
//   // }
//   var params = {
//     UserPoolId: USERPOOL_ID, 
//     Username: username,
//     TemporaryPassword: password,
//     UserAttributes: [
//       {
//         Name: 'email', 
//         Value: email
//       }
//     ],
//   };
//   console.log("#########");
//   const ADMINUSER = await cognitoidentityserviceprovider.adminCreateUser(params).promise()
//     try {
//         console.log("IF");
//         var params = {
//           GroupName: body.group, 
//           UserPoolId: USERPOOL_ID, 
//           Username: username 
//         };
//         const ADDTOGROUP = cognitoidentityserviceprovider.adminAddUserToGroup(params).promise()
//           if (err){ 
//             return res.status(400).json({ message: err});
//           } 
//           else {
//             console.log(data, "DATA");
//             return res.status(200).json({ message: data}); 
//           }           
//         console.log(data);
//         return res.status(200).json({ message: data}); 

//     } catch (error) {
//       console.log(err, "ER");
//       return res.status(200).json({ message: err});
//     }
// }


// module.exports.handler = handler;
