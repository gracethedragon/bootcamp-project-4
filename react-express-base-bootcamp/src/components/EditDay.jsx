import React, { useState, useEffect } from 'react';
import axios from 'axios'

export default function EditDay({dayData, setCreateTrip, setShowTrip, setEditDay}) {
  console.log(dayData, 'itinerarytitle')
  const data = {
    location:'',
    transport:'',
    time:'',
    type:'',
    reference:''
  }

  const [formFields, setFormFields] = useState(dayData.day.data)
  const [title, setTitle] = useState(dayData.trip)
  const tripId = dayData.trip.id
  const dayId = dayData.day.id

  const handleFieldsAdd =()=>{
    setFormFields([...formFields, data])
    console.log(formFields, 'formfields')
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
    console.log("InputFields", formFields, title)
    // setCreateTrip(false)
    
    
    // add in trip id and day id
    
    axios.put(`/trips/${tripId}/${dayId}`, {
      formData:{
        title: title.name,
        formFields
      }
    }).then((response)=>{
      console.log(response, 'response')
      // setShowSelectedTrip(tripId)
      setEditDay()
      setShowTrip(response.data)
    })

  };

  return (
     <div>
        <h2>{title.name}</h2>
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
              <select name='type' onChange={(event)=>handleInputChange(event, index)}
                defaultValue={field.type ? field.type : 'DEFAULT'}>
                <option value="DEFAULT" disabled>---Choose one---</option>
                <option value="accommodation">accommodation</option>
                <option value="food">f000d</option>
                <option value="drinks">drinks</option>
                <option value="shopping">shopping</option>
                <option value="museums">museums/galleries</option>
            </select>
              {/* <input name='type' value={field.type} onChange={(event)=>handleInputChange(event, index)}/> */}
            </div>
            
          <div className="reference">
            <label>References</label>
            <input type="textarea" name='reference' value={field.reference} onChange={(event)=>handleInputChange(event, index)} />
          </div>
          
          
          {index !== 0 &&
            <div className="remove">
              <button onClick={()=>handleFieldsRemove(index)}>remove</button> 
            </div>
            }
            <hr></hr>
        </div>
       ))}
       
       
        <button onClick={handleFieldsAdd}>add</button>    
        <button onClick={handleSubmit}>Submit</button>
  
     </div>
     
    
    )
    
    
}
