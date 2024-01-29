const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
});
const userConnect = mongoose.model("Users",userSchema)
module.exports = userConnect;