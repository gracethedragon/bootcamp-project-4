import React, {useState} from 'react';
import Form,  {BrowseMyExisting }from './components/TripForm.jsx'
import BrowseAll from './components/BrowseTrips.jsx'
import axios from 'axios'

export default function App() {
  const [createTrip, setCreateTrip] = useState(false);  
  const [browseTrip, setBrowseTrip] = useState(false);  

  const create = () => {
    console.log('clicked show') 
    browseTrip === true ? setBrowseTrip(false) : null
    return setCreateTrip(!createTrip);
  }

  const browse = () => {
    console.log('clicked browse')
    createTrip === true ? setCreateTrip(false) : null
    return setBrowseTrip(!browseTrip);
  }

  return (
    <div>
        <button onClick={browse}>view trips</button>
      {browseTrip && (
        <div>
          <div>this is the browse</div>
          <BrowseAll/>
          
        </div>
      )}
      <button onClick={create}>create a trip</button>
      {createTrip && (
        <div><BrowseMyExisting/></div>
      )}
    </div>
  )
}