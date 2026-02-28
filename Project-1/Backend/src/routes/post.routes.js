    const express = require("express")
    const postRouter = express.Router()
    const postController = require("../controller/post.controller")
    const multer = require("multer")
    const upload = multer({storage:multer.memoryStorage()})
    const IdentifyUser = require("../middlewares/auth.middleware")


// Use of Middlewares in api
    postRouter.post("/",upload.single("image"),IdentifyUser , postController.createPostController)

    postRouter.get("/",IdentifyUser, postController.getPostController)

    postRouter.get("/posts/details/:postId",IdentifyUser,postController.getPostdetailsController)

    postRouter.post("/like/:postId",IdentifyUser, postController.likepostController)


    module.exports = postRouter
