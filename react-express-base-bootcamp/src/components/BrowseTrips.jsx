import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useCookies } from 'react-cookie';


function show (trips, setShowSelectedTrip, showMine){
  console.log( showMine, 'mine')
  console.log(trips,'trips')
  return ( 
    <div className="row">  
      {showMine ? <h2>MY TRIPS</h2> : <h2>ALL TRIPS</h2>}
           
      {trips && 
        trips.map((trip)=>{
          const {id, name, country, length, createdAt, updatedAt} = trip
          return (
            <div className="row" key={id} onClick={()=>setShowSelectedTrip(id)}>
              {length <= 1 ?
              <h5>{name}, {length} day</h5> :
              <h5>{name}, {length} days</h5>}
            </div>
          )
        })}
    </div>
    )
}
export default function BrowseAll ({setShowSelectedTrip, mine}){
  const [cookies, setCookie, removeCookie] = useCookies();
  console.log(mine)  
  const [trips, setTrips]= useState()
    if(mine){
      useEffect(()=>{
        let userId = cookies.userId
        axios
        .get(`/mytrips/${userId}`)
        .then((response)=>{
          console.log('response', response.data.myTrips)
          const responseTrips = response.data.myTrips.sort((a,b)=>a.id - b.id)
          setTrips(responseTrips)
        }) 
      }, [])
      return show(trips, setShowSelectedTrip, true)
    } else {
      useEffect(()=>{
        axios
        .get('/trips')
        .then((response)=>{
          console.log('response', response.data.items)
          const responseTrips = response.data.items.sort((a,b)=>a.id - b.id)
          setTrips(responseTrips)
        })
      }, [])
      let showMine = 'false'
      return show(trips, setShowSelectedTrip)
    }
    
 }

export function BrowseMine ({setShowSelectedTrip}){
    const [trips, setTrips]= useState()

    useEffect(()=>{
    let userId = 1
      axios
      .get(`/mytrips/${userId}`)
      .then((response)=>{
      console.log('response', response.data.items)
      const responseTrips = response.data.items.sort((a,b)=>a.id - b.id)
      setTrips(responseTrips)
      })
    }, [])
    
    return show(trips, setShowSelectedTrip)
}