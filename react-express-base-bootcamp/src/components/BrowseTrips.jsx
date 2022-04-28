import React, { useState, useEffect } from 'react';
import axios from 'axios'


function show (trips, setShowSelectedTrip, showMine){
  console.log( showMine, 'mine')
  return ( 
    <div>  
      {showMine ? <h2>my trips</h2> : <h2>list of all trips</h2>}
           
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
export default function BrowseAll ({setShowSelectedTrip, mine}){
  console.log(mine)  
  const [trips, setTrips]= useState()
    if(mine){
      useEffect(()=>{
        let userId = 2
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
    
    
    
//     return (
    
//     <div>
//       <h2>list of trips</h2>
//       {trips && 
//         trips.map((trip)=>{
//           const {id, name, country, length, createdAt, updatedAt} = trip
//           return (
//             <div key={id} onClick={()=>setShowSelectedTrip(id)}>
//               <h5>{name}, {country}, {length} days, {createdAt}</h5>
//             </div>
//           )
//         })}
//     </div>
//     )
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