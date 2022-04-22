import React, {useState} from 'react';
import Form from './components/TripForm.jsx'

export default function App() {
  const [showForm, setShowForm] = useState(false);  
  const show = (event) => {
    console.log('clicked')
    return setShowForm(!showForm);
  }

  return (
    <div>
        <button onClick={show}>submit a trip</button>
      {showForm && (
        <div>
          <div>this is the form</div>
          <Form/>
        </div>
      )}
    </div>
  )
}