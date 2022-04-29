import React, { useState, useEffect } from 'react';
import axios from 'axios'
import EditDay from './EditDay.jsx';
import Form from './TripForm.jsx';
import { useCookies } from 'react-cookie';

export default function ShowTrip({showSelectedTrip, setBrowseTrip, setShowSelectedTrip, setCreateTrip}){   
    const [deleteTrip, setDeleteTrip] = useState(false)
  
    // delete entire trip
    const remove=(tripId)=>{
      setDeleteTrip(true)
      setShowTrip(false)
      console.log(tripId)
      axios
      .delete(`/trips/${tripId}`)
      .then((response)=>{
        console.log(response)
        setShowSelectedTrip('')
        setBrowseTrip(true)
      }) 
      
      
    }
    // delete trip-day
    const [deleteDay, setDeleteDay] = useState(false)

    const removeDay=(tripId, dayId)=>{
      setDeleteDay(!deleteDay)
      axios.delete(`/trips/${tripId}/${dayId}`)
      .then((response)=> console.log(response))
    }

    const [showTrip, setShowTrip]= useState()
    useEffect(()=>{
      axios
      .get(`/trips/${showSelectedTrip}`)
      .then((response)=>{
      console.log('response', response.data)
      const responseTrips = response.data
      setShowTrip(responseTrips)
      console.log(deleteDay, 'delete')
      })
    },[showSelectedTrip, deleteDay])
    console.log(showTrip, 'trips')

    let dayData
    //edit form
    const [editDay, setEditDay]= useState()

    const edit = (tripId, dayId)=>{
      console.log('edit')
      axios
      .get(`/trips/${tripId}/${dayId}`)
      .then((response) => {
        setEditDay(response.data)
        console.log(dayData, 'day data')
        setShowTrip(false)
        console.log('set as true')
      })
    }
    
  return(
    <div>

     {editDay && 
     <div>
      <h2>hello</h2>
      <EditDay dayData={editDay} setShowTrip={setShowTrip} setEditDay={setEditDay} />
      {/* <Form itineraryTitle={'hello'} dayData={editDay} setCreateTrip={setCreateTrip}/> */}
      </div>
    }

    {showTrip && 
    <><h2>{showTrip.tripName.name}, {showTrip.tripName.country}, {showTrip.tripName.length} days</h2><button onClick={() => remove(showTrip.tripName.id)}>Delete entire trip</button>
    <button>Reorder days</button></>}

    {showTrip &&      
      showTrip.tripDays.map((day, index)=>{
      return(
      <div key={"day" + index + 1}>
        Day {index + 1}
        <button onClick={()=>edit(day.tripId, day.id)}>Edit</button>
        <button onClick={()=>removeDay(day.tripId, day.id, )}>Delete</button>
        {day.data.map((stops, index)=>{ 
          
          return(
          <ul key={"day" + index + 1}>            
            {stops.transport !== '' && <h6 >{stops.transport}, {stops.time} minutes</h6>}
            <li >{stops.location} ({stops.type})</li>
            <h6 >{stops.reference}</h6>
          </ul>
          )
        })}
      </div>)
    })
    }
    
    </div>
  )
}