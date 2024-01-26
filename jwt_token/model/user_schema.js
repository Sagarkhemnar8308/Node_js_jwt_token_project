const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstname: {
        required: true,
        type: String
    },
    lastname: {
        required: true,
        type: String
    },
    village: {
        required: true,
        type: String
    },
    pincode: {
        required: true,
        type: Number
    }
});
const userConnect = mongoose.model("User Info",userSchema)
module.exports = userConnect;