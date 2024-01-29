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
    },
    async getUserByEmail(email,password){
        return await userSchema.findOne({email:data,password:password})
    },
    async userExist(data){
        return await userSchema.findOne(data).select("-password")
    }
}

module.exports = userLogic;