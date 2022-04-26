import React, { useState, useEffect } from 'react';
import axios from 'axios'

export default function BrowseAll (){
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
          const {id, name, country, length, createdAt, updatedAt} = trip
          return (
            <div key={id}>
              <h5> {name}, {country}, {length} days, {createdAt}</h5>          
            </div>
          )
        })}
    </div>
    )
}

export function BrowseMyExisting (){
  const [myTrips, setMyTrips]= useState()
  const [newTrip, setNewTrip]= useState(false)

  const handleChange =(event)=>{
    const selectedOption = event.target.value
    console.log(selectedOption, 'selected')
    selectedOption === 'new' ? setNewTrip(true) : setNewTrip (false) 
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
      <h2>list of trips</h2>
      <select onChange={handleChange}>
        <option value="new">Create new itinerary</option>
        {myTrips && 
        myTrips.map((myTrip, index)=>{
          return(
          <option key={index} value={myTrip.name}>{myTrip.name}</option>
          )
        })   
        }
      </select>
      {newTrip && (
        <div>
         <input name="title" type="text" />
         </div>
      )
      }
    </div>
    )
}