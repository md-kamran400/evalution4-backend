const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: String,
    email: String ,
    gender: String,
    password : String 
})

const UsersModel = mongoose.model("posts", UserSchema)

module.exports = {UsersModel};