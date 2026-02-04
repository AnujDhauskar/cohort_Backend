/*
server ko start karna

 */

const app = require('./app')
const mongoose = require("mongoose");

function connectToDb(){
    mongoose.connect("")// you have to put databse link to connect 
    .then(()=>{
        console.log("connected to db")
    })
}
connectToDb();


app.listen(3000,()=>{
    console.log('server is running on port 3000')
})