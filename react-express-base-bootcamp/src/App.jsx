import React, {useState, useEffect} from 'react';
import Form,  {BrowseMyExisting }from './components/TripForm.jsx'
import BrowseAll from './components/BrowseTrips.jsx'
import ShowTrip from './components/ShowTrip.jsx';
import axios from 'axios'

export default function App() {
  const [createTrip, setCreateTrip] = useState(false);  
  const [myTrip, setMytrip] = useState(false)
  const [browseTrip, setBrowseTrip] = useState(false);  
  const [displaySelected, setDisplaySelected] = useState(false)
  const [showSelectedTrip, setShowSelectedTrip] = useState('')

  const create = () => {
    console.log('clicked show') 
    setShowSelectedTrip('')
    setBrowseTrip(false)
    return setCreateTrip(true);
  }

  const browse = () => {
    console.log('clicked browse', showSelectedTrip, browseTrip) 
    setShowSelectedTrip('')
    setCreateTrip(false)
    return setBrowseTrip(true);
  }

  const browseMine = () =>{
    console.log('clicked browse mine')
  }

  useEffect(()=>{
    console.log(showSelectedTrip, browseTrip, createTrip)
    if(showSelectedTrip!== ''){
      console.log('1')
      setDisplaySelected(true)
      setBrowseTrip(false)
      setCreateTrip(false)
    }
    if(browseTrip){
      console.log('2')
      setCreateTrip(false)
      setDisplaySelected(false)
    }
    if(createTrip){
      console.log('2')
      setBrowseTrip(false)
      setDisplaySelected(false)
      setShowSelectedTrip('')
    }
    console.log(showSelectedTrip, browseTrip, createTrip)
  }, [createTrip, browseTrip, showSelectedTrip])
  return (
    <div>
        <button onClick={browseMine}>view my trips</button>
        <button onClick={browse}>browse all trips</button>
        <button onClick={create}>create a trip</button>
        {browseTrip && 
          <BrowseAll setShowSelectedTrip={setShowSelectedTrip}/>}       

        {displaySelected &&
          <ShowTrip showSelectedTrip={showSelectedTrip} />
          }    
      
        {createTrip &&
        <BrowseMyExisting/>}
      
    </div>
  )
}