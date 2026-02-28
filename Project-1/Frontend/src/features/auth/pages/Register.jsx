import React, { useState } from 'react'
import { Link } from 'react-router'
import axios from 'axios'


const Register = () => {

  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  async function handleSubmit(e){
    e.preventDefault()

    axios.post("http://localhost:3000/api/auth/register",{
      username,
      email,
      password
    },{
      withCredentials:true
    })
    .then(res=>{
      console.log(res.data)
    })
  }

  return (
      <main>
      <div className="form-container">

        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input onInput={(e)=>{setusername(e.target.value)}}  type="text" name='username' placeholder='Enter Username'/>
          <input onInput={(e)=>{setemail(e.target.value)}}  type="text" name='email' placeholder='Enter Email'/>
          <input onInput={(e)=>{setpassword(e.target.value)}}  type="text" name='password' placeholder='Enter Password' />
        <button type='submit'>Register</button>
        </form>

        <p>Already have an account? <Link className='toggleAuthForm' to="/login">Login</Link></p>
      </div>
    </main>
  )
}

export default Register
