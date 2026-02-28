const followModel = require("../models/follow.model")

async function followUserController(req,res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    if(followeeUsername === followUsername) {
        return res.status(400).json(
            {
                message: "You cannot follow yourself"
            }
        )
    }

    const isFolloweeExist = await userModel.findOne({username: followeeUsername})

    if(!isFolloweeExist){
        return res.status(404).json({
            message: "The user you are trying to follow does not exist" 
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        followee: followeeUsername,
        follower: followerUsername
    })

    if(isAlreadyFollowing){
        return res.status(200).json({
            message:`You are already following ${followeeUsername}`,
            follow: isAlreadyFollowing
        })
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername
    })

    res.status(201).json(
        {
            message: `You are now following ${followeeUsername}`,
            follow: followRecord
        }
    )

}

async function unfollowUserController(req,res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username


    const isUserFollowing = await followModel.findOne({
        follower:followerUsername,
        followee: followeeUsername,
    })

    if(!isUserFollowing){
        return res.status(400).json({
            message: "You are not following this user"
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)
    res.status(200).json({
        message: `You have unfollowed ${followeeUsername}`
    })
}

module.exports = {
    followUserController,
    unfollowUserController
}