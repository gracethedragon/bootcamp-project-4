import React, { useState } from 'react';
import axios from 'axios'

export default function Form({addFormFields}) {
  const initialValues= {
    location:'',
    transport:'',
    time:'',
    type:''
  }

  const [formValues, setFormValues] = useState(initialValues)

  const handleInputChange = (event) => {
    const {name, value} = event.target

    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const handleSubmit =()=>{
    const newTrip = {data:{
      location: formValues.location,
      transport: formValues.transport,
      time: formValues.time,
      type: formValues.type
    }
    }
    axios.post('/trips', newTrip).then(result=>{
      console.log(result)
    })
  }

  const [formFields, setFormFields] = useState (1)

  const addFields =(event)=>{
    setFormFields (formFields + 1)
    console.log(formFields, setFormFields)
  }
    return (
     <div>
       <h2>Submit a trip!</h2>
       <div>
        <label>
          Location
          <input
          name='location'
          value={formValues.location}
          onChange={handleInputChange} />
        </label>
        {/* <label>
          Transport
          <input
          name='transport'
          value={formValues.transport}
          onChange={handleInputChange} />
        </label> */}
        <label>
          Time
          <input
          name='time'
          value={formValues.time}
          onChange={handleInputChange} />
        </label>
        <label>
          Type
          <input
          name='type'
          value={formValues.type}
          onChange={handleInputChange} />
        </label>
       </div>
       <button onClick={addFormFields}>add</button>

       <button onClick={handleSubmit}>Submit</button>
     </div>
    )
  };

function addFormFields(){

    const initialValues= {
    location:'',
    transport:'',
    time:'',
    type:''
  }

  const [formValues, setFormValues] = useState(initialValues)

  const handleInputChange = (event) => {
    const {name, value} = event.target

    setFormValues({
      ...formValues,
      [name]: value
    })
  }
    console.log('clicked')
    
    return (
     <div>
       <label>
         Location
         <input
         name='location'
         value={formValues.location}
         onChange={handleInputChange} />
       </label>
       <label>
         Transport
         <input
         name='transport'
         value={formValues.transport}
         onChange={handleInputChange} />
       </label>
       <label>
         Time
         <input
         name='time'
         value={formValues.time}
         onChange={handleInputChange} />
       </label>
       <label>
         Type
         <input
         name='type'
         value={formValues.type}
         onChange={handleInputChange} />
       </label>
    </div>)
}