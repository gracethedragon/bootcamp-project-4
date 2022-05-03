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
  const createUser = (e) =>{
    e.preventDefault()
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
      
      <div >
        <form onSubmit={(e)=>createUser(e)}>
        <h2>SIGN UP</h2>
        
        {createError && 
          
          <h6>email already registered, please try again</h6>
        }
      <div className="row justify-content-center mb-3">
      <div className="col-12 mb-3">
        <label>Email</label><br />
        <input type="text" name="email" onChange={(event)=>handleInputChange(event)} required/> <br />
      </div>
      <div className="col-12 mb-3">
        <label>Password</label><br/>
        <input type="password" name="password" onChange={(event)=>handleInputChange(event)} required/> <br/>
      </div>
      </div>
      <div className="row justify-content-center">
      <div className="col">
         <input className="button"type="button" onClick={()=>setHasAccount(true)} value="Sign In"/>
      </div>
      <div className="col">
        <input className="button" type="submit" value="Create" />
        <br/>
      </div>
    </div>
    </form>
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
  const checkUser = (e) =>{
    e.preventDefault()
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
    <div className="secondContainer row">
    {!hasAccount && <Create setHasAccount={setHasAccount}/>}

    {hasAccount && 
    <div>
      <form onSubmit={(e)=> checkUser(e)}>
      <h2>LOGIN</h2>
      {loginError &&
      <h6>wrong email/password, please check and try again</h6>
      }
      <div className="row justify-content-center mb-3">
      <div className="col-12 mb-3">
       <label>Email</label><br/>
        <input type="text" name="email" placeholder={typeof(hasAccount) !== "boolean"? hasAccount : null} onChange={(event)=>handleInputChange(event)} required/> <br/>
      </div>
      <div className="col-12 mb-3">
        <label>Password</label><br/>
        <input type="password" name="password" onChange={(event)=>handleInputChange(event)} required/> <br/>
      </div>
      </div>

      <div className="row justify-content-center">
        <div className="col">
        <input className="button" type="button" onClick={()=>setHasAccount(false)} value="Create"/>
        </div>
        <div className="col">
        <input className="button" type="submit" value="Submit"/>
      </div>
      </div>
      </form>
    </div>
    }
    </div>

    
  )
}
