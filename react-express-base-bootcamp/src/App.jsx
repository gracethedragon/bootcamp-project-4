import React, {useState, useEffect} from 'react';
import Form,  {BrowseMyExisting }from './components/TripForm.jsx'
import BrowseAll from './components/BrowseTrips.jsx'
import ShowTrip from './components/ShowTrip.jsx';
import axios from 'axios'

export default function App() {
  const [createTrip, setCreateTrip] = useState(false);  
  const [browseTrip, setBrowseTrip] = useState(false);  
  const [displaySelected, setDisplaySelected] = useState(false)
  const [showSelectedTrip, setShowSelectedTrip] = useState('')

  const create = () => {
    console.log('clicked show') 
    setShowSelectedTrip('')
    return setCreateTrip(!createTrip);
  }

  const browse = () => {
    console.log('clicked browse', showSelectedTrip, browseTrip) 
    setShowSelectedTrip('')
    return setBrowseTrip(!browseTrip);
  }

  useEffect(()=>{
    console.log(showSelectedTrip, browseTrip, createTrip)
    if(showSelectedTrip!== ''){
      setDisplaySelected(true)
      setBrowseTrip(false)
      setCreateTrip(false)
    }
    else if(browseTrip){
      setCreateTrip(false)
      setDisplaySelected(false)
      
    }
    else if(createTrip){
      setBrowseTrip(false)
      setDisplaySelected(false)
      setShowSelectedTrip('')
    }
    console.log(showSelectedTrip, browseTrip, createTrip)
  }, [createTrip, browseTrip, showSelectedTrip])
  return (
    <div>
        <button onClick={browse}>view trips</button>
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