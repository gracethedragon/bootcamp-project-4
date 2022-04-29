import React, {useState, useEffect} from 'react';
import Form,  {BrowseMyExisting }from './components/TripForm.jsx'
import BrowseAll, {BrowseMine} from './components/BrowseTrips.jsx'
import ShowTrip from './components/ShowTrip.jsx';
import Login from './components/Login.jsx';
import { useCookies } from 'react-cookie';

export default function App() {
  const [createTrip, setCreateTrip] = useState(false);  
  const [myTrip, setMytrip] = useState(false)
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
    return setBrowseTrip(true);
  }

  const browseMine = () =>{
    console.log('clicked browse mine')
    setShowSelectedTrip('')
    setCreateTrip(false)
    setBrowseTrip(false)
    return setBrowseMyTrips(true);
  }

  const signOut = () => {
    removeCookie('loggedIn')
    removeCookie('userId')
    setLoggedIn(false)
  }

  useEffect(()=>{
    console.log(showSelectedTrip, browseTrip, createTrip)
    if(showSelectedTrip!== ''){
      console.log('1')
      setDisplaySelected(true)
      setBrowseTrip(false)
      setBrowseMyTrips(false)
      setCreateTrip(false)
    }
    if(browseTrip){
      console.log('2')
      setCreateTrip(false)
      setBrowseMyTrips(false)
      setDisplaySelected(false)
    }
    if(browseMyTrips){
      console.log('3')
      setCreateTrip(false)
      setBrowseTrip(false)
      setDisplaySelected(false)
    }
    if(createTrip){
      console.log('4')
      setBrowseTrip(false)
      setBrowseMyTrips(false)
      setDisplaySelected(false)
      setShowSelectedTrip('')
    }
    console.log(showSelectedTrip, browseTrip, browseMyTrips, createTrip)
  }, [createTrip, browseTrip,browseMyTrips, showSelectedTrip])
  return (
    <div>
      {!loggedIn &&
        <Login setLoggedIn={setLoggedIn}/>
      }
      {loggedIn && 
      <div>
        <button onClick={browseMine}>view my trips</button>
        <button onClick={browse}>browse all trips</button>
        <button onClick={create}>create a trip</button>
        <button onClick={signOut}>sign out</button>
      </div> }
        {browseTrip && loggedIn && 
          <BrowseAll setShowSelectedTrip={setShowSelectedTrip}/>}

        {browseMyTrips && loggedIn && 
          <BrowseAll mine={true} setShowSelectedTrip={setShowSelectedTrip}/>}       

        {displaySelected && loggedIn &&
          <ShowTrip showSelectedTrip={showSelectedTrip} setBrowseTrip={setBrowseTrip} setShowSelectedTrip={setShowSelectedTrip} />
          }    
      
        {createTrip && loggedIn &&
        <BrowseMyExisting setShowSelectedTrip={setShowSelectedTrip} setCreateTrip={setCreateTrip}/>}
      
    </div>
  )
}