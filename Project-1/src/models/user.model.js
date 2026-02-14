const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"Username already Exists"],
        required:[true,"Username is required"],
    },
    email:{
        type:String,
        unique:[true,"Email is already exists"],
        required:[true,"Email is required"]
    },
    password:{
        type:String,
        required:[true,"Password is required"]

    },
    bio: String,
    profileImage:{
        type: String,
        default:"https://ik.imagekit.io/xfgbpm21y/cohort-Backend/gray-picture-person-with-gray-background_1197690-22.avif"
    }

})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel;