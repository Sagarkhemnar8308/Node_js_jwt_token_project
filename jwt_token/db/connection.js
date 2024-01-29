const mongoose= require("mongoose");


const connection= mongoose.connect("mongodb://127.0.0.1:27017/JWTUsers").then((e)=>{
    console.log("Connected Successfully ")
}).catch((e)=>{
    console.log(`failed to connect ${e}`)
})

module.exports= connection;