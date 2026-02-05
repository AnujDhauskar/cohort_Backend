// server ko start karna
// database se connect karna
require('dotenv').config()
const app = require("./app")
const connectToDb = require('./config/database')

connectToDb();
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})