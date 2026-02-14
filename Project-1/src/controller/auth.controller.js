const userModel = require("../models/user.model")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

async function registerController(req,res){
    const {email,username,password,bio,profileImage} = req.body
 //checking user is already exists by using model.findone method


    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            { username },
            { email} 
            
        ]
    })

    if(isUserAlreadyExists){
        res.status(409).json({
            message: "User already Exits" + (isUserAlreadyExists.email == email ? "Email is Already Exists" : "username Already exists")
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex')

    const user = await userModel.create({
        username,
        email,
        password: hash,
        bio,
        profileImage
    })

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET,{expiresIn:"1d"})

    res.cookie("token", token)

    res.status(201).json({
        message:"user Registered successfully",

        user : 
        {
            email:user.email,
            username:user.username,
            bio:user.bio,
            profileImage:user.profileImage,
        }
    })
}


async function loginController (req,res) {
    const{username,email,password} = req.body

    const user = await userModel.findOne({
        $or:[
            {
                username: username
            },
            {
                email: email
            }
    ]
    })

    if(!user){
        return res.status(404).json({
            message:'User not Found'
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex')

    const isPasswordValid = hash == user.password

    if(!isPasswordValid){
        return res.status(401).json({ 
            message:"Password Invalid"
        })
    }

    const token = jwt.sign(
        {
            id:user._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"1d"
        }
    )

    res.cookie("token",token)

    res.status(200).json({
        message:"User LoggedIn successfully",
        user:
        {
            Username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage,
        }
    })
}

module.exports = {
    registerController,
    loginController
}