const userSchema = require("../model/user_schema.js");

const userLogic = {

    async getAllUser() {
        return await userSchema.find();
    },
    async postUser(data) {
        return await userSchema.create(data)
    },
    async updateUser(id, data) {
        return await userSchema.findByIdAndUpdate(id, data, { new: true })
    },
    async deleteUser(id){
        return await userSchema.findByIdAndDelete(id);
    }
}

module.exports = userLogic;