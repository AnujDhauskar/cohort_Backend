require("dotenv").config();
const app = require("./app")
const connectToDB = require("./config/database")
const cookieParser = require("cookie-parser")



connectToDB();
app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})