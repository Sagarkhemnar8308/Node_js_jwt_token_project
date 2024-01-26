const express = require("express")
const db=require('./db/connection.js')
const user_crud= require('./router/user_info.js')
const server = express();
server.use("/",user_crud);
const PORT = 4500;

server.get("/health", (req, resp) => {
    resp.send(`application is running in ${PORT}`)
});

server.listen(PORT, (req, resp) => {
   console.log("Server is running on "+PORT)
});