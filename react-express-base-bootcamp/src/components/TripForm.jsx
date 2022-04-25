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
  const [title, setTitle] = useState('')

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
  let formData = {}

  const getTitleValue=(event)=>{
    setTitle(event.target.value)
    console.log('get title')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
   
    console.log("InputFields", formFields, title)
   
    axios.post('/trips', {
      formData:
      {title,
      formFields}
    }).then((response)=>console.log(response))
  };

  return (
     <div>
       <h2>Submit a trip!</h2>
        
      <label>Title</label>
      <input name="title" type="text" onChange={getTitleValue} />
       {formFields.map((field, index) => (

        <div className="formField" id = {index} key={index}>
            {index === 0 &&
              <></>
            }
            <div className="stop">
              Stop {index +1}
            </div>

            {index !== 0 &&
            <><div className="transport">
               <label>Transport</label>
               <input name='transport' value={field.transport} onChange={(event) => handleInputChange(event, index)} />
             </div><div className="time">
                 <label>Travel Time (minutes)</label>
                 <input type="number" name='time' value={field.time} onChange={(event) => handleInputChange(event, index)} />
               </div></>
            }
            <div className="location">
              <label>Location</label>
              <input type="text" name='location' value={field.location} onChange={(event)=>handleInputChange(event, index)}/>
            </div>

            <div className="type">
              <label>Type</label>
              <select name='type' value={field.type} onChange={(event)=>handleInputChange(event, index)}>
                <option value="accommodation">accommodation</option>
                <option value="food">f000d</option>
                <option value="drinks">drinks</option>
                <option value="shopping">shopping</option>
                <option value="museums">museums/galleries</option>
            </select>
              {/* <input name='type' value={field.type} onChange={(event)=>handleInputChange(event, index)}/> */}
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

