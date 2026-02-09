import { useEffect, useState } from 'react'
import axios from "axios"

function App() {

  const [notes, setNotes] = useState([])

  function fetchNotes(){

  axios.get('http://localhost:3000/api/notes')
  .then((res)=>{
    setNotes(res.data.notes)
  })
  }

useEffect(() => {

fetchNotes()

}, [])
      
      function submitHandler(e){
        e.preventDefault()
        const{title,description} = e.target.elements
        console.log(title.value,description.value)
        // craeting note by using post api
        axios.post("http://localhost:3000/api/notes",{
          title:title.value,
          description:description.value
        })
        .then(res=>{
          console.log(res.data)
          fetchNotes() //display notes by calling fetchNotes() function 
        })
      }

      function handleDeleteNote(noteId){
        axios.delete("http://localhost:3000/api/notes/"+noteId)
        .then(res=>{
          console.log(res.data)
          fetchNotes()
        })

      } 
  return (
    <>
    <form className='note-create-form' onSubmit={submitHandler}>
      <input name="title" type="text" placeholder='Enter title' />
      <input name = "description" type="text" placeholder='Enter description'/>
      <button> Create Note </button>
    </form>
    
    <div className="notes">
    
    {
    notes.map((note, index) => {
  return (
    <div className="note" key={index}>
      <h1>{note.title}</h1>
      <p>{note.description}</p>
      <button onClick={()=>{
        handleDeleteNote(note._id)
      }}>Delete</button>
    </div>
  );
})

    }
    </div>


    </>    
  )
}

export default App
