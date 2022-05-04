import React, { useState, useEffect } from 'react';
import axios from 'axios'

let countryList = ['Afghanistan','Albania','Algeria','Andorra','Angola','Antigua and Barbuda','Argentina','Armenia','Australia','Austria','Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bhutan','Bolivia','Bosnia and Herzegovina','Botswana','Brazil','Brunei','Bulgaria','Burkina Faso','Burundi','Côte dIvoire','Cabo Verde','Cambodia','Cameroon','Canada','Central African Republic','Chad','Chile','China','Colombia','Comoros','Congo (Congo-Brazzaville)','Costa Rica','Croatia','Cuba','Cyprus','Czechia (Czech Republic)','Democratic Republic of the Congo','Denmark','Djibouti','Dominica','Dominican Republic','Ecuador','Egypt','El Salvador','Equatorial Guinea','Eritrea','Estonia','Eswatini (fmr. "Swaziland")','Ethiopia','Fiji','Finland','France','Gabon','Gambia','Georgia','Germany','Ghana','Greece','Grenada','Guatemala','Guinea','Guinea-Bissau','Guyana','Haiti','Holy See','Honduras','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Israel','Italy','Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kiribati','Kuwait','Kyrgyzstan','Laos','Latvia','Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg','Madagascar','Malawi','Malaysia','Maldives','Mali','Malta','Marshall Islands','Mauritania','Mauritius','Mexico','Micronesia','Moldova','Monaco','Mongolia','Montenegro','Morocco','Mozambique','Myanmar (formerly Burma)','Namibia','Nauru','Nepal','Netherlands','New Zealand','Nicaragua','Niger','Nigeria','North Korea','North Macedonia','Norway','Oman','Pakistan','Palau','Palestine State','Panama','Papua New Guinea','Paraguay','Peru','Philippines','Poland','Portugal','Qatar','Romania','Russia','Rwanda','Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines','Samoa','San Marino','Sao Tome and Principe','Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore','Slovakia','Slovenia','Solomon Islands','Somalia','South Africa','South Korea','South Sudan','Spain','Sri Lanka','Sudan','Suriname','Sweden','Switzerland','Syria','Tajikistan','Tanzania','Thailand','Timor-Leste','Togo','Tonga','Trinidad and Tobago','Tunisia','Turkey','Turkmenistan','Tuvalu','Uganda','Ukraine','United Arab Emirates','United Kingdom','United States of America','Uruguay','Uzbekistan','Vanuatu','Venezuela','Vietnam','Yemen','Zambia']

export default function EditDay({dayData, setCreateTrip, setShowTrip, setEditDay}) {
  console.log(dayData, 'itinerarytitle')
  const data = {
    location:'',
    transport:'',
    time:'',
    type:'',
    reference:''
  }
  const [country, setDayCountry] = useState(dayData.day.country.name)
  const [formFields, setFormFields] = useState(dayData.day.data)
  const [title, setTitle] = useState(dayData.trip)
  const tripId = dayData.trip.id
  const dayId = dayData.day.id


  const handleCountryChange=(event)=>{
    setDayCountry({country: event.target.value})
    console.log(event)
    console.log(country)
   
  }

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
        country,
        formFields
      }
    }).then((response)=>{
      console.log(response, 'response')
      // setShowSelectedTrip(tripId)
      const responseTrips = response.data
      responseTrips.tripDays?.sort((a,b)=>a.id - b.id)
      setEditDay()
      setShowTrip(responseTrips)
    })

  };

  return (
     <div>
        <h2>{title.name}</h2>
        <form onSubmit={(e)=>handleSubmit(e)}>
        <div className="country">
        <label>Country:</label>
        <select name='country' onChange={(event)=>handleCountryChange(event)}
          defaultValue={country} required>
          <option value="" disabled>---Choose one---</option>
          {countryList.map((country)=><option key ={country} value={country}>{country}</option>)}
        </select>       
      </div>   

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
               {/* <input name='transport' value={field.transport} onChange={(event) => handleInputChange(event, index)} required /> */}
               <select name='transport' onChange={(event)=>handleInputChange(event, index)}
                defaultValue={''} required>
                <option value="" disabled>---Came here by---</option>
                <option value="walking">walking</option>
                <option value="taxi">taxi</option>
                <option value="driving">driving</option>
                <option value="bus">bus</option>
                <option value="train">train</option>
                <option value="boat">boat</option>
                <option value="plane">plane</option>
                </select>
             </div><div className="time">
                 <label>Travel Time (minutes)</label>
                 <input type="number" name='time' value={field.time} onChange={(event) => handleInputChange(event, index)} required/>
               </div></>
            }
            <div className="location">
              <label>Location</label>
              <input type="text" name='location' value={field.location} onChange={(event)=>handleInputChange(event, index)} required/>
            </div>

            <div className="type">
              <label>Type</label>
              <select name='type' onChange={(event)=>handleInputChange(event, index)}
                defaultValue={field.type ? field.type : ''} required>
                <option value="" disabled>---Choose one---</option>
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
            <textarea name='reference' value={field.reference} onChange={(event)=>handleInputChange(event, index)} />
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
        <input type="submit" value="Submit"/>
        
      </form>
     </div>
     
    
    )
    
    
}
