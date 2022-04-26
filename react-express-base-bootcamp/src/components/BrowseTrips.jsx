import React, { useState, useEffect } from 'react';
import axios from 'axios'

export default function BrowseAll ({setShowSelectedTrip}){
    const [trips, setTrips]= useState()

    useEffect(()=>{
      axios
      .get('/trips')
      .then((response)=>{
      console.log('response', response.data.items)
      const responseTrips = response.data.items.sort((a,b)=>a.id - b.id)
      setTrips(responseTrips)
      })
    }, [])
    return (
    <div>
      <h2>list of trips</h2>
      {trips && 
        trips.map((trip)=>{
          const {id, name, country, length, createdAt, updatedAt} = trip
          return (
            <div key={id} onClick={()=>setShowSelectedTrip(id)}>
              <h5>{name}, {country}, {length} days, {createdAt}</h5>
            </div>
          )
        })}
    </div>
    )
}

