const postModel = require("../models/post.model")
const Imagekit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")


// Connecting with  imagekit
const imagekit = new Imagekit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

// creating post api to create post 
async function createPostController( req, res) {

    console.log(req.body, req.file)

    const token = req.cookies.token // getting token from users cookie
    
    if(!token){
        return res.status(401).json(
            {
                message : " Unauthorized Access"
            }
            
    
        )
    }

    let decoded = null
    
    try {  
        decoded = jwt.verify(token,process.env.JWT_SECRET) // verifying token valid or not
    } catch (err) {
        return res.status({
            message: " User is not  authorized"  // err message if not valid
        })
    }

    

    console.log(decoded)

    //uploading created post on imagekit
    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer),'file'),
        fileName:"Test",
        folder: "Cohort-2-Insta-Clone-Posts"// uploading image on imagekit  with Cohort-2-Insta-Clone-Posts this name
    })

    // saving post on database - mongodb
    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: decoded.id 
    })

    res.status(201).json({
        message:"Post Created successfully.",
        post
    })
}

// api for fetching post data
async function getPostController( req , res){
    const token = req.cookies.token

    if(!token){
            return res.status(401).json(
                {
                    message:"User Unauthorized"
                }
            )
        } 

    let decoded = null
    try{
    decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch(err){
            return res.status(401).json(
                {
                    message: "Token Invalid"
                }
            )
    }
    const userId  = decoded.id

    const posts = await postModel.find({
        user : userId
        
    })

    res.status(200).json({
        message:"post fetched successfully",
        posts   
    })
}

// api for fetching post details by userId as params
async function getPostdetailsController(req , res){
        const token = req.cookies.token

        if(!token){
            return res.status(401).json(
                {
                    message:"User Unauthorized"
                }
            )
        }

        let decoded = null;
        try{
            decoded = jwt.verify(token , process.env.JWT_SECRET)
        }catch(err){
            return res.status(401).json({
                message: " Token is not valid"
            })
        }

        const userId = decoded.id
        const postId = req.params.postId

        const post =  await postModel.findById(postId)

        if(!post){
            return res.status(404).json({
                message: "Post Not found"
            })
        }

        const isValidUser = post.user.toString() === userId

        if(!isValidUser){
            return res.status(403).json(
                {
                    message: "Forbidden content."
                }
            )
        }

        return res.status(201).json({
            message: "Post fetched successfully",
            post
        })
}


module.exports = {
    createPostController,
    getPostController,
    getPostdetailsController
}