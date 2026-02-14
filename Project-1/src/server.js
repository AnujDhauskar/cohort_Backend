require('dotenv').config()  //this line is written veryfirst in server.js file
const app = require("./app")
const connectToDB = require("./config/database")

connectToDB()

app.listen(3000,()=>{
    console.log("server is running on port no 3000")
})