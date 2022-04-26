import React, { useState, useEffect } from 'react';
import axios from 'axios'

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
  return(
    <div>
    {showTrip && 
      showTrip.map((day, index)=>{
      return(
      <div key={"day" + index + 1}>
        Day {index + 1}
        {day.data.map((stops, index)=>{ 
          
          return(
          <ul key={"day" + index + 1}>            
            {stops.transport !== '' && <h6 >{stops.transport}, {stops.time} minutes</h6>}
            <li key>{stops.location} ({stops.type})</li>
          </ul>
          )
        })}
      </div>)
    })
    }
    </div>
  )
}