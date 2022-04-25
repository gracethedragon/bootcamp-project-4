import React, { useState } from 'react';
import axios from 'axios'

export default function Form() {
  const data = {
    location:'',
    transport:'',
    time:'',
    type:''
  }

  const [formFields, setFormFields] = useState([data])

  const handleFieldsAdd =()=>{
    setFormFields([...formFields, data])
    console.log(formFields)
  }

  const handleFieldsRemove =(index)=>{
    const list = [...formFields]
    console.log(index)
    list.splice(index,1)
    setFormFields(list)
    console.log(formFields)
  }

  const handleInputChange = (event, index) => {
    const newFormFields = formFields.map(field => {
      if(index === formFields.indexOf(field)) {
        field[event.target.name] = event.target.value
      }
      return field;
    })
    setFormFields(newFormFields);
  }

   const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("InputFields", formFields);
    axios.post('/trips', {formData:formFields}).then((response)=>console.log(response))
  };

  return (
     <div>
       <h2>Submit a trip!</h2>

       {formFields.map((field, index) => (

        <div className="formField" id = {index} key={index}>
            <div className="stop">
              Stop {index +1}
            </div>

            {index !== 0 &&
            <><div className="transport">
               <label>Transport</label>
               <input name='transport' value={field.transport} onChange={(event) => handleInputChange(event, index)} />
             </div><div className="time">
                 <label>Time</label>
                 <input name='time' value={field.time} onChange={(event) => handleInputChange(event, index)} />
               </div></>
            }
            <div className="location">
              <label>Location</label>
              <input name='location' value={field.location} onChange={(event)=>handleInputChange(event, index)}/>
            </div>
            
            

            <div className="type">
              <label>Type</label>
              <input name='type' value={field.type} onChange={(event)=>handleInputChange(event, index)}/>
            </div>
            
          <div className="refereces">
            <label>References</label>
            <input name='references'/>
          </div>
          
          
          {index !== 0 &&
            <div className="remove">
              <button onClick={()=>handleFieldsRemove(index)}>remove</button> 
            </div>
            }
        </div>
       ))}
       
       
        <button onClick={handleFieldsAdd}>add</button>    
        <button onClick={handleSubmit}>Submit</button>
     </div>
     
    
    )
    
    
}

