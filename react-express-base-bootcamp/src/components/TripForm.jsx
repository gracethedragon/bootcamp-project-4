import React, { useState, useEffect } from 'react';
import axios from 'axios'

// import { GoogleMap, useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import Autocomplete from "react-google-autocomplete";




let countryList = ['Afghanistan','Albania','Algeria','Andorra','Angola','Antigua and Barbuda','Argentina','Armenia','Australia','Austria','Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bhutan','Bolivia','Bosnia and Herzegovina','Botswana','Brazil','Brunei','Bulgaria','Burkina Faso','Burundi','Côte dIvoire','Cabo Verde','Cambodia','Cameroon','Canada','Central African Republic','Chad','Chile','China','Colombia','Comoros','Congo (Congo-Brazzaville)','Costa Rica','Croatia','Cuba','Cyprus','Czechia (Czech Republic)','Democratic Republic of the Congo','Denmark','Djibouti','Dominica','Dominican Republic','Ecuador','Egypt','El Salvador','Equatorial Guinea','Eritrea','Estonia','Eswatini (fmr. "Swaziland")','Ethiopia','Fiji','Finland','France','Gabon','Gambia','Georgia','Germany','Ghana','Greece','Grenada','Guatemala','Guinea','Guinea-Bissau','Guyana','Haiti','Holy See','Honduras','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Israel','Italy','Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kiribati','Kuwait','Kyrgyzstan','Laos','Latvia','Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg','Madagascar','Malawi','Malaysia','Maldives','Mali','Malta','Marshall Islands','Mauritania','Mauritius','Mexico','Micronesia','Moldova','Monaco','Mongolia','Montenegro','Morocco','Mozambique','Myanmar (formerly Burma)','Namibia','Nauru','Nepal','Netherlands','New Zealand','Nicaragua','Niger','Nigeria','North Korea','North Macedonia','Norway','Oman','Pakistan','Palau','Palestine State','Panama','Papua New Guinea','Paraguay','Peru','Philippines','Poland','Portugal','Qatar','Romania','Russia','Rwanda','Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines','Samoa','San Marino','Sao Tome and Principe','Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore','Slovakia','Slovenia','Solomon Islands','Somalia','South Africa','South Korea','South Sudan','Spain','Sri Lanka','Sudan','Suriname','Sweden','Switzerland','Syria','Tajikistan','Tanzania','Thailand','Timor-Leste','Togo','Tonga','Trinidad and Tobago','Tunisia','Turkey','Turkmenistan','Tuvalu','Uganda','Ukraine','United Arab Emirates','United Kingdom','United States of America','Uruguay','Uzbekistan','Vanuatu','Venezuela','Vietnam','Yemen','Zambia']

export default function Form({itineraryTitle, setShowSelectedTrip, setCreateTrip}) {
  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: "AIzaSyA5hmlh5wvDhbic2H_AyaH0CbHpnm2xBhU",
  //   libraries: 'places',
  // })
  const locationArray = []
  const [country, setDayCountry] = useState('')
  let userId = Number(document.cookie.replace(/(?:(?:^|.*;\s*)userId\s*\=\s*([^;]*).*$)|^.*$/, "$1"))
  console.log(itineraryTitle,'itinerarytitle')
  const data = {
    location:'',
    transport:'',
    time:'',
    type:'',
    reference:''
  }

  const handleCountryChange=(event)=>{
    setDayCountry({country: event.target.value})
    console.log(event)
    console.log(country)
   
  }
  const [formFields, setFormFields] = useState([data])

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

  const handleInputChangeTest = (event, value) => {
    console.log(event.target.value,'event')
    console.log(value,'value')
    // const newFormFields = formFields.map(field => {
    //   if(index === formFields.indexOf(field)) {
    //     field[event.target.name] = event.target.value
    //   }
    //   return field;
    // })
    // setFormFields(newFormFields);
  }

  const handleInputChange = (event, index, value) => {
    console.log(event.target.value,'event')
    console.log(value,'value')
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
    setCreateTrip(false)
    
    if(itineraryTitle.id) {
      console.log('itinerary exists')
      axios.post('/existingtrips', {
        formData:{
          title: itineraryTitle,
          country,
          userId,
          formFields
        }
      }).then((response)=>{
        console.log(response)
        let tripId = response.data.tripId
        setShowSelectedTrip(tripId)
      })
    } else {
      console.log(' does not exist')
      axios.post('/trips', {
      formData:
      {title: itineraryTitle,
        country,
        userId,
      formFields}
      }).then((response)=>{
        console.log(response)
        let tripId = response.data.tripId
        setShowSelectedTrip(tripId)
      })
    }
    
  };

  return (
     <div>
      {itineraryTitle && (
        <h4>{itineraryTitle.title}</h4>
      )}
      <form onSubmit={(e)=>handleSubmit(e)}>
      <div className="row justify-content-center ">
      <div className="col mb-3">
        <select name='country' onChange={(event)=>handleCountryChange(event)}
          defaultValue={''} required>
          <option value="" disabled>---Choose Country---</option>
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
            <><div className="transport mb-3">
               <label><i className="fa fa-arrows">&nbsp;</i></label>
               {/* <input name='transport' value={field.transport} onChange={(event) => handleInputChange(event, index)} placeholder ="I came here by ..." required /> */}
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
             </div>
             
             <div className="mb-3">
                 <label><i className="fa fa-clock-o">&nbsp;</i></label>
                 <input type="number" name='time' value={field.time} onChange={(event) => handleInputChange(event, index)} placeholder="Time taken (minutes)" required/>
               </div></>
            }
            <div className="location mb-3">
              <label><i className="fa fa-map-marker">&nbsp;</i></label>
              <input type="text" name='location' 
              value={field.location} 
              onChange={(event)=>handleInputChange(event, index)} placeholder="Location" required/>
              
            </div>

            <div className="type mb-3">
              <label><i className="fa fa-tag">&nbsp;</i></label>
              <select name='type' onChange={(event)=>handleInputChange(event, index)}
                defaultValue={''} required>
                <option value="" disabled>---Location Type---</option>
                <option value="accommodation">accommodation</option>
                <option value="food">f000d</option>
                <option value="drinks">drinks</option>
                <option value="shopping">shopping</option>
                <option value="museums">museums/galleries</option>
            </select>
            </div>
            
          <div className="reference mb-3 mx-2">
            <label><i className="fa fa-search">&nbsp;</i></label>
            <textarea name='reference' value={field.reference} onChange={(event)=>handleInputChange(event, index)} placeholder="Reference links, if any"/>
          </div>
          
          
          {index !== 0 &&
            <div className="remove">
              <button className="button" onClick={()=>handleFieldsRemove(index)}><i class="fa fa-trash"> stop</i></button> 
            </div>
            }
            <hr></hr>
        </div>
       ))}
       
       <div className="row justify-content-center">
        <div className="col-5">
          <button className="button" onClick={handleFieldsAdd}><i class="fa fa-plus"> stop</i></button>    
        </div>
        <div className="col-5">
          <input className="button submitButton"  type="submit" value="&#xf1d8; submit"/>
        </div>
      </div>
        </div>
      </form>
      
     </div>
     
    
    )
    
    
}

export function BrowseMyExisting ({setShowSelectedTrip, setCreateTrip}){
  const [myTrips, setMyTrips]= useState()
  const [newTrip, setNewTrip]= useState(false)
  const [showForm, setShowForm] = useState(false);  
  const [title, setTitle] = useState({title:'', id:''})
  let userId = Number(document.cookie.replace(/(?:(?:^|.*;\s*)userId\s*\=\s*([^;]*).*$)|^.*$/, "$1"))
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
    console.log(event)

    setTitle({...title,
      [event.target.name]: event.target.value})
    
    console.log(title)
   
  }

  const submit = (e) => {
    e.preventDefault()
    console.log('clicked show') 
    console.log(title)
    return setShowForm(!showForm);
  }

  useEffect(()=>{
    axios
      .get(`/mytrips/${userId}`)
      .then((response)=>{
      console.log('response', response.data.myTrips)
      const responseTrips = response.data.myTrips
      setMyTrips(responseTrips)
      })
    }, [])
    console.log(myTrips, 'my trips')

    return (
    <div className="row">
      <h2>Existing Trips</h2>
      <button onClick={()=>calcRoute()}> test api</button>
    
      <form onSubmit={(e)=>submit(e)}>
      <div className="mb-3">
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
      </div>
      
      {newTrip && (
        <div className="mb-3">
         <input name="title" type="text" onChange={(event)=>handleInputChange(event)} placeholder="Give your trip a name!" required/>
         </div>
      )
      }
      <div className="mb-3">
      <input type="submit" value="Create Trip"/>
      </div> 
      </form> 
      {showForm &&
        <Form itineraryTitle={title} setShowSelectedTrip={setShowSelectedTrip} setCreateTrip={setCreateTrip}/>
      }
    </div>
    )
}

let directionsService = new google.maps.DirectionsService();

//define calcRoute function
function calcRoute() {
    console.log(document.getElementsByClassName('locationInput'), 'input')
    const locations = Array.from(document.getElementsByClassName('locationInput'))

    console.log('locations', locations)
    //create request
    const request = {
        origin: 'los angeles',
        destination: 'new york city',
        travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.METRIC
    }

    //pass the request to the route method
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            console.log(result,'routes')
            console.log(result.routes[0].legs[0].distance.text, 'distance')
            console.log(result.routes[0].legs[0].duration.text, 'duration')
            //Get distance and time
            //display route
            // directionsDisplay.setDirections(result);
        } else {
            console.log('error')
            ;
        }
    });

}
