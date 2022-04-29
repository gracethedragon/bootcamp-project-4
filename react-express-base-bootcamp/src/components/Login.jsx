import React, { useState, useEffect } from 'react';
import axios from 'axios'


function Create({setHasAccount}){
  const [userFields, setUserFields] = useState({email:'', password:''})
  const [createError, setCreateError] = useState(false)

  const handleInputChange=(event)=>{
    setUserFields({...userFields,
      [event.target.name]: event.target.value})
    console.log(userFields)
  }
  const createUser = () =>{
    axios
    .post('/user/create', {userFields})
    .then((response)=> {
      console.log(response, 'response')
      if(response.data === 'email already registered') {
        setCreateError(true)
      } else {
        setHasAccount(userFields.email)
      }
    })
  }
  return (
    <div>
      <h2>Create an account</h2>
      {createError && 
      <h3>email already registered, please try again</h3>}
      <label>Email</label>
      <input type="text" name="email" onChange={(event)=>handleInputChange(event)}/> <br/>
      <label>Password</label>
      <input type="password" name="password" onChange={(event)=>handleInputChange(event)}/> <br/>
      <button onClick={createUser}>Create!</button>
      <button onClick={()=>setHasAccount(true)}> I have an account</button>
    </div>
  )
}

export default function Login ({setLoggedIn}){
  const [hasAccount, setHasAccount] = useState(true)
  const [loginError, setLoginError] = useState()
  const [userFields, setUserFields] = useState({email:'', password:''})


  const handleInputChange=(event)=>{
    setUserFields({...userFields,
      [event.target.name]: event.target.value.toLowerCase()})
    console.log(userFields)
  }
  const checkUser = () =>{
    console.log(userFields, 'checking')
    axios
    .post('/user/login', {userFields})
    .then((response)=> {
      console.log(response, document.cookie,'response')
      if(response.data.email) {
        setLoggedIn(true)
        setLoginError(false)
      } else if (response.data === 'failed') {
        setLoginError(true)
        console.log('login error')
      }
    })
  }
  return (
    <div>
    {!hasAccount && <Create setHasAccount={setHasAccount}/>}

    {hasAccount && 
    <div>
      <h2>Login</h2>
      {loginError &&
      <h3>wrong email/password, please check and try again</h3>
      }
      <label >Email</label>
      <input type="text" name="email" placeholder={typeof(hasAccount) !== "boolean"? hasAccount : null} onChange={(event)=>handleInputChange(event)}/> <br/>
      <label>Password</label>
      <input type="password" name="password" onChange={(event)=>handleInputChange(event)}/> <br/>
      <button onClick={()=>setHasAccount(false)}>Create an account</button>
      <button onClick={checkUser}> Submit</button>
    </div>
    }
    </div>

    
  )
}
