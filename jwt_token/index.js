const express = require("express")
const db = require('./db/connection.js')
const user_crud = require('./router/user_info.js')
const User = require('./model/user_schema.js')
const jwt = require("jsonwebtoken")
const dataservice = require("./services/user_services.js")
const jwtkey = 'user'
const server = express();
server.use("/", user_crud);
const PORT = 4500;

server.get("/health", (req, resp) => {
    resp.send(`application is running in ${PORT}`)
});


server.post('/signup', async (req, resp) => {
    const existingUser = await dataservice.getUserByEmailAndPassword(req.body.email,req.body.password);
    if (existingUser) {
        resp.json({ "message": "User already exist !" });
    } else {
        let result = await dataservice.postUser(req.body)
        jwt.sign({ result }, jwtkey, { expiresIn: "24h" }, (err, token) => {
            if (token) {
                resp.json({
                    "message":"Logged in successfully",
                    "status":resp.statusCode,
                     "token":token
                })
            } else if (err) {
                resp.json({ "status": "Failed", "message": "Something went wrong" + err })
            } else {

            }
        });

    }
});

server.post('/profile', verifyToken, (req, res) => {
    jwt.verify(req.token, jwtkey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Failed to authenticate token" });
        }
        res.json({ status: "Success", data: decoded.result });
    });
});


// server.post('/login',verifyToken, async (req, resp) => {
//     if (req.body.email && req.body.password) {
//         let user = await dataservice.userExist(req.body)
//         if (user) {
//             jwt.sign({ user }, jwtkey, { expiresIn: "10h" }, (err, token) => {
//                 if (token) {
//                     resp.json({
//                         "status": "Success",
//                         "data": user,
//                         "Auth": token
//                     })
//                 } else {
//                     resp.json({ "status": "Failed", "message": "Something went wrong" })

//                 }
//             });

//         } else {
//             resp.json({ "status": "User not Exist sign up" })
//         }
//     } else {
//         resp.json({
//             "Error": "No user Found"
//         })
//     }
// });

server.listen(PORT, (req, resp) => {
    console.log("Server is running on " + PORT)
});




function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    } else {
        res.send({
            result: 'Token is not valid'
        })
    }
}