import React, { useState, useEffect } from 'react';
import axios from 'axios'
import EditDay from './EditDay.jsx';
import Form from './TripForm.jsx';
import { useCookies } from 'react-cookie';



export default function ShowTrip({showSelectedTrip, setBrowseTrip, setShowSelectedTrip, setCreateTrip}){   
    const [deleteTrip, setDeleteTrip] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies();
    const [userIsAuthor, setUserIsAuthor] = useState(false)

    let loggedInUserId = Number(document.cookie.replace(/(?:(?:^|.*;\s*)userId\s*\=\s*([^;]*).*$)|^.*$/, "$1"))

    console.log(loggedInUserId, 'cookie')
  
    // delete entire trip
    const remove=(tripId)=>{
      setDeleteTrip(!deleteTrip)
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
      responseTrips.tripDays?.sort((a,b)=>a.id - b.id)
      
      if(response.data.tripName?.userId === loggedInUserId){
        setUserIsAuthor(true)
      } 
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
    <div class="row d-flex justify-content-around">

     {editDay && 
     <div>
      <EditDay dayData={editDay} setShowTrip={setShowTrip} setEditDay={setEditDay} />
      </div>
    }

    {showTrip && 
    <>
    {showTrip.tripName.length <= 1 ?
    <>
    <h2>{showTrip.tripName.name} </h2>
    <h4>{showTrip.tripName.length} day trip</h4>
    <h6> Updated {showTrip.tripName.updatedAt.split("T")[0]}</h6></> :
    <>
    <h2>{showTrip.tripName.name}</h2>
    <h4>{showTrip.tripName.length} days trip</h4>
    <h6>{showTrip.tripName.updatedAt.split("T")[0]}</h6></>}
      
      {userIsAuthor &&
      <>
      <div class="col">
      <button className="button">Reorder days</button>
      </div>
      <div class="col">
        <button class="button" onClick={() => remove(showTrip.tripName.id)}><i class="fa fa-trash"> entire trip</i></button>
      </div>
      
      </>
      }
    </>}
      
    {showTrip &&      
      showTrip.tripDays.map((day, index)=>{
      return(
      <div class="row" class="day" key={"day" + index + 1}>
        
        <div>
        <h4>Day {index + 1}, {day.country.name}</h4>
        

        {userIsAuthor &&
        <>
        
          <button class="btn" onClick={() => edit(day.tripId, day.id)}><i class="fa fa-edit"></i></button>
       
          <button class="btn" onClick={() => removeDay(day.tripId, day.id)}><i class="fa fa-trash"></i></button>
        
        </>
        }
        </div>
        <div>
        
        {day.data.map((stops, index)=>{ 
          return(
          <div class="row dayEvents" key={"day" + index + 1}>            
            {stops.transport !== '' && <h6 >{stops.transport}, {stops.time} minutes</h6>}
            <h5 >{stops.location} ({stops.type})</h5>
            <h6 >{stops.reference}</h6>    
          </div>
          )
        })}
        <hr></hr>
        </div>
      </div>)
    })
    }
    
    
    </div>
  )
}