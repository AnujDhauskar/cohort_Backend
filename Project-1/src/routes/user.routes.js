
const express = require("express")
const userController = require("../controller/user.controller")
const identifyUser = require("../middlewares/auth.middleware")
const userRouter = express.Router();

/*   @route POST /api/users/follow/:userid
    @description : Follow a user
    @access: Private
*/

userRouter.post("/follow/:username", identifyUser, userController.followUserController)
//unfollow user
userRouter.post("/unfollow/:username", identifyUser, userController.unfollowUserController)


module.exports = userRouter;