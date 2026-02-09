//server ko create karna in app.js file 
// server ko config karna

const express = require("express")
const noteModel = require('./models/note.model')
const cors = require("cors")
const path = require("path")

const app = express();

app.use(cors())   //this middleware is used to performs cross origin request 
app.use(express.json()) // this is used for api jason formating
app.use(express.static("./public")) // this middleware handles  the api req which ahs not created and returns html file in response 



// creating note by using post api 
app.post('/api/notes', async (req,res) => {
    const {title , description} = req.body

    const note = await noteModel.create({
        title , description 
    })

    res.status(201).json({
        message: "note created successfully",
        note 
    })
})

// fetching note by createing get api 
app.get('/api/notes', async (req , res ) => {
    const notes = await noteModel.find()

    res.status(200).json({
        message: "Notes fetched successfully",
        notes
    })
})

// deleting note by using delete api 

app.delete('/api/notes/:id',async (req , res) => {
    const id = req.params.id 
    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message:"Note deleted successfully."

    })
})

// update note by using PATCH  method 

app.patch('/api/notes/:id' , async (req , res ) =>{
    const id = req.params.id
    const {description} = req.body 

    await noteModel.findByIdAndUpdate(id, { description })

    res.status(200).json({
        message: "Note updated successfully."
    })

})


// this code handles the unknown requests on api and returns html file 
app.use("*name", (req, res ) => {
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
})

module.exports = app