import React, {useState, useEffect} from 'react';
import Form,  {BrowseMyExisting }from './components/TripForm.jsx'
import BrowseAll, {BrowseMine} from './components/BrowseTrips.jsx'
import ShowTrip from './components/ShowTrip.jsx';
import Login from './components/Login.jsx';
import { useCookies } from 'react-cookie';


export default function App() {
  const [createTrip, setCreateTrip] = useState(false);  
  // const [myTrip, setMytrip] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [browseTrip, setBrowseTrip] = useState(false);  
  const [browseMyTrips, setBrowseMyTrips] = useState(false);  
  const [displaySelected, setDisplaySelected] = useState(false)
  const [showSelectedTrip, setShowSelectedTrip] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies();

  const create = () => {
    console.log('clicked show') 
    setShowSelectedTrip('')
    setBrowseTrip(false)
    setBrowseMyTrips(false)
    return setCreateTrip(true);
  }

  const browse = () => {
    console.log('clicked browse', showSelectedTrip, browseTrip) 
    setShowSelectedTrip('')
    setCreateTrip(false)
    setBrowseMyTrips(false)
    setShowLogin(false)
    return setBrowseTrip(true);
  }

  const browseMine = () =>{
    console.log('clicked browse mine')
    setShowSelectedTrip('')
    setCreateTrip(false)
    setBrowseTrip(false)
    return setBrowseMyTrips(true);
  }

  const loginPage = () =>{
    setShowSelectedTrip('')
    setBrowseTrip(false)
    setBrowseMyTrips(false)
    return setShowLogin(true)
  }

  const signOut = () => {
    removeCookie('loggedIn')
    removeCookie('userId')
    setShowSelectedTrip('')
    return setLoggedIn(false)
  }

  useEffect(()=>{
    console.log(showSelectedTrip, browseTrip, browseMyTrips, displaySelected, createTrip)
   
    if(showSelectedTrip!== ''){
      console.log('1')
      setBrowseTrip(false)
      setBrowseMyTrips(false)
      setCreateTrip(false)
      setDisplaySelected(true)
    } else if (showSelectedTrip === '') {
      setDisplaySelected(false)
    }

    if(!loggedIn){
      removeCookie('loggedIn')
      removeCookie('userId')
    }
    
  }, [createTrip, browseTrip, browseMyTrips, showSelectedTrip, showLogin])
  return (
    <div id="container">
        <input className="button mx-2" type="button"  onClick={browse} value="Browse"/>

        {!loggedIn &&
        <input className="button mx-2" type="button"  onClick={loginPage} value="Login"/>
        }

        {showLogin && !loggedIn &&
        <Login setLoggedIn={setLoggedIn}/>
        }
      
        {loggedIn &&
        <>
        <input className="button mx-2" type="button" onClick={browseMine} value="My Trips"/>
        <input className="button mx-2" type="button" onClick={create} value="Create"/>
        <input className="button mx-2" type="button" onClick={signOut} value="Seeya"/></>}    
      
        {browseTrip && 
          <BrowseAll setShowSelectedTrip={setShowSelectedTrip}/>}

        {browseMyTrips &&
          <BrowseAll mine={true} setShowSelectedTrip={setShowSelectedTrip}/>}       

        {displaySelected && 
          <ShowTrip showSelectedTrip={showSelectedTrip} setBrowseTrip={setBrowseTrip} setShowSelectedTrip={setShowSelectedTrip} />
          }    

        {createTrip && loggedIn &&
        <BrowseMyExisting setShowSelectedTrip={setShowSelectedTrip} setCreateTrip={setCreateTrip}/>}
      
    </div>
  )
}