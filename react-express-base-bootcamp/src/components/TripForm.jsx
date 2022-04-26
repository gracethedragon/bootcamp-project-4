import React, { useState, useEffect } from 'react';
import axios from 'axios'


export default function Form({itineraryTitle}) {
  console.log(itineraryTitle, 'itinerarytitle')
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
    console.log("InputFields", formFields, itineraryTitle)

    if(itineraryTitle.id) {
      console.log('itinerary exists')
      axios.post('/existingtrips', {
        formData:{
          title: itineraryTitle,
          formFields
        }
      }).then((response)=>console.log(response))
    } else {
      console.log(' does not exist')
      axios.post('/trips', {
      formData:
      {title: itineraryTitle,
      formFields}
      }).then((response)=>console.log(response))
    }
    
  };

  return (
     <div>
      {itineraryTitle && (
      <div>
        <h2>{itineraryTitle.title}</h2>
      </div> 
      )}
      
       <h2>Submit a trip!</h2>
        
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

export function BrowseMyExisting (){
  const [myTrips, setMyTrips]= useState()
  const [newTrip, setNewTrip]= useState(false)
  const [showForm, setShowForm] = useState(false);  
  const [title, setTitle] = useState({title:'', id:''})

  const handleChange =(event)=>{
    const selectedOption = event.target.options[event.target.selectedIndex].text
    console.log(event.target.options[event.target.selectedIndex].text, 'selected')
    if (selectedOption === 'Create new itinerary'){
      setNewTrip(true)
    } else {
      setNewTrip (false) 
      setTitle({ title: selectedOption, id: event.target.value})
      console.log(title, 'title')
    } 
  }

  const handleInputChange=(event)=>{
    console.log(event.target.value,' event')
    setTitle({title:event.target.value})
    console.log(title, 'title')
  }

  const submit = () => {
    console.log('clicked show') 
    console.log(title)
    return setShowForm(!showForm);
  }

  useEffect(()=>{
      axios
      .get('/mytrips')
      .then((response)=>{
      console.log('response', response.data.myTrips)
      const responseTrips = response.data.myTrips
      setMyTrips(responseTrips)
      })
    }, [])
    console.log(myTrips, 'my trips')

    return (
    <div>
      <h2>existing trips</h2>
      <select onChange={handleChange} defaultValue={'DEFAULT'}>
        <option value="DEFAULT" disabled>---Choose one---</option>
        <option value="new">Create new itinerary</option>
        {myTrips && 
        myTrips.map((myTrip)=>{
          return(
          <option key={myTrip.id} value={myTrip.id}>{myTrip.name}</option>
          )
        })   
        }
      </select>
      {newTrip && (
        <div>
         <input name="title" type="text" onChange={handleInputChange} />
         </div>
      )
      }
      <div>
      <button onClick={submit}>create an itinerary</button>
      </div>  
      {showForm && (
        <div>  
          <div>this is the form</div>
          <Form itineraryTitle={title}/>
        </div>
      )}
    </div>
    )
}