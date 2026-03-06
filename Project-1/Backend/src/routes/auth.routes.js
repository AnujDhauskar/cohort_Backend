const express = require("express")
const authController = require("../controller/auth.controller")
const identifuyUser = require("../middlewares/auth.middleware")

const authRouter = express.Router()


//POST /api/auth/register
authRouter.post("/register", authController.registerController)

//post/api/auth/login

authRouter.post("/login", authController.loginController)

// GET api/auth/get-me

authRouter.get("/get-me", identifuyUser, authController.getMeController)

module.exports = authRouter