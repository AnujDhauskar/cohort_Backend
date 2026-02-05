//server ko create karna in app.js file 
// server ko config karna

const express = require("express")
const noteModel = require('./models/note.model')
const cors = require("cors")

const app = express();

app.use(cors())
app.use(express.json())


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

module.exports = app