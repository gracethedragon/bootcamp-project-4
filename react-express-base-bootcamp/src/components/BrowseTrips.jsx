import React, { useState, useEffect } from 'react';
import axios from 'axios'

export default function Browse (){
    const [trips, setTrips]= useState()
    useEffect(()=>{
      axios
      .get('/trips')
      .then((response)=>{
      console.log('response', response.data.items)
      const responseTrips = response.data.items
      setTrips(responseTrips)
      })
    }, [])
    console.log(trips, 'trips')

    return (
    <div>
      <h2>list of trips</h2>
      {trips && 
        trips.map((trip)=>{
          const {id, name, data, createdAt, updatedAt} = trip
          return (
            <div key={id}>
              <h5> {name}, {createdAt}</h5>          
            </div>
          )
        })}
    </div>
    )

}