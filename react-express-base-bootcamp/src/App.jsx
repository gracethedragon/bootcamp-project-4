import React, {useState} from 'react';
import Form from './components/TripForm.jsx'
import Browse from './components/BrowseTrips.jsx'
import axios from 'axios'

export default function App() {
  const [showForm, setShowForm] = useState(false);  
  const [browseTrip, setBrowseTrip] = useState(false);  

  const submit = () => {
    console.log('clicked show') 
    browseTrip === true ? setBrowseTrip(false) : null
    return setShowForm(!showForm);
  }

  const browse = () => {
    console.log('clicked browse')
    
    showForm === true ? setShowForm(false) : null
    return setBrowseTrip(!browseTrip);
  }

  return (
    <div>
        <button onClick={browse}>view trips</button>
      {browseTrip && (
        <div>
          <div>this is the browse</div>
          <Browse/>
        </div>
      )}
        <button onClick={submit}>submit a trip</button>
      {showForm && (
        <div>
          <div>this is the form</div>
          <Form/>
        </div>
      )}
      
    </div>
  )
}