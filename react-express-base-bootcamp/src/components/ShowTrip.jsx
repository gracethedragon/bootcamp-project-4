import React, { useState, useEffect } from 'react';
import axios from 'axios'

// function remove(id){
//   const [deleteTrip, setDeleteTrip] = useState(true)
//   console.log(id)
//   axios
//   .delete(`/trips/${id}`)
//   .then((response)=>console.log('deleted', response))
//   setDeleteTrip(false)

//   return (<div>
//     {!deleteTrip &&
//     deleted
// }</div>)
// }

export default function ShowTrip({showSelectedTrip}){

  const [showTrip, setShowTrip]= useState()
    useEffect(()=>{
      axios
      .get(`/trips/${showSelectedTrip}`)
      .then((response)=>{
      console.log('response', response.data)
      const responseTrips = response.data
      setShowTrip(responseTrips)
      })
    },[showSelectedTrip])
    console.log(showTrip, 'trips')
    
    const [deleteTrip, setDeleteTrip] = useState(false)
    const remove=(id)=>{
      setDeleteTrip(true)
      setShowTrip(false)
      console.log(id)
      axios
      .delete(`/trips/${id}`)
      .then((response)=>console.log(response)) 
    }
    //   console.log(showTrip.tripName)
  return(
    <div>
    {showTrip && 
    <><h2>{showTrip.tripName.name}, {showTrip.tripName.country}, {showTrip.tripName.length} days</h2><button onClick={() => remove(showTrip.tripName.id)}>Delete entire trip</button></>}

    {deleteTrip &&
      <h3>trip deleted</h3>
    }

    {showTrip &&      
      showTrip.tripDays.map((day, index)=>{
      return(
      <div key={"day" + index + 1}>
        Day {index + 1}
        <button>Edit</button>
        <button>Delete</button>
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