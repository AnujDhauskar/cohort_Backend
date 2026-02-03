const express = require("express")

const app = express()

app.use(express.json()) // by default server cannot able to read json data so MIDDLE WARE needs to use here


const notes = [

]

app.get("/", (req,res)=>{
    res.send("hello world")
})

app.post("/notes", ( req,res ) => {
    console.log(req.body)
    notes.push(req.body)
    console.log(notes)

    res.send("note created")
})

app.get("/notes", (req,res)=>{
    res.send(notes)
})

app.delete("/notes/:index", (req,res)=>{
    delete notes[req.params.index ]
    res.send("note deleted sucssesfully")
})

app.patch("/notes/:index", (req,res)=>{
    notes[req.params.index].description = req.body.description
    res.send("Note updated sucssesfully")
})

module.exports =  app