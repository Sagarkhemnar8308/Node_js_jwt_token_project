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
    const existingUser = await dataservice.getUserByEmail(req.body.email);
    if (existingUser) {
        resp.json({"message":"User already exist !"});
    } else {
        let result = await dataservice.postUser(req.body)
        delete result.password;
        jwt.sign({ result }, jwtkey, { expiresIn: "10h" }, (err, token) => {

            if (token) {
                resp.json({
                    "status": "Success",
                    "data": result,
                    "Auth": token
                })
            } else {
                resp.json({ "status": "Failed", "message": "Something went wrong" })

            }
        });

    }
});


server.post('/login', async (req, resp) => {
    if (req.body.email && req.body.password) {
        let user = await  dataservice.userExist(req.body)
        if (user) {
            jwt.sign({ user }, jwtkey, { expiresIn: "10h" }, (err, token) => {

                if (token) {
                    resp.json({
                        "status": "Success",
                        "data": user,
                        "Auth": token
                    })
                } else {
                    resp.json({ "status": "Failed", "message": "Something went wrong" })

                }
            });

        } else {
            resp.json({ "status": "Failed" })
        }
    } else {
        resp.json({
            "Error": "No user Found"
        })
    }
});

server.listen(PORT, (req, resp) => {
    console.log("Server is running on " + PORT)
});