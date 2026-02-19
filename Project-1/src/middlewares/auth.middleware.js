const jwt = require("jsonwebtoken")

async function IdentifyUser(req , res , next){

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
    req.user = decoded

    next()
}

module.exports = IdentifyUser