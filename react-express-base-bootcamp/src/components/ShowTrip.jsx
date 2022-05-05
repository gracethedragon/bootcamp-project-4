import React, { useState, useEffect } from 'react';
import axios from 'axios'
import EditDay from './EditDay.jsx';
import Form from './TripForm.jsx';
import { useCookies } from 'react-cookie';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';



export default function ShowTrip({showSelectedTrip, setBrowseTrip, setShowSelectedTrip, setCreateTrip}){   
    const [deleteTrip, setDeleteTrip] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies();
    const [userIsAuthor, setUserIsAuthor] = useState(false)

    let loggedInUserId = Number(document.cookie.replace(/(?:(?:^|.*;\s*)userId\s*\=\s*([^;]*).*$)|^.*$/, "$1"))
  
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
    let dayOrderArr = []
    useEffect(()=>{
      axios
      .get(`/trips/${showSelectedTrip}`)
      .then((response)=>{
      
      console.log('response', response.data)
      const responseTrips = response.data
      responseTrips.tripDays?.sort((a,b)=>a.order - b.order)
      
      // dayOrderArr = responseTrips.tripDays?.map((day)=> day.id)

      // setDayOrder(dayOrderArr)

      // console.log(dayOrder)

      if(response.data.tripName?.userId === loggedInUserId){
        setUserIsAuthor(true)
      } 
      
      setShowTrip(responseTrips)
      
      console.log(deleteDay, 'delete')
      })
    },[showSelectedTrip, deleteDay])
    console.log(showTrip, 'trips')

    //handle reordering ofdays
    
    const [reorderButton, setReorderButton] = useState('Reorder');
    const [disableDrag, setDisableDrag] = useState(true)
    

    function activateReorder(){
      console.log(reorderButton)
      if (reorderButton === 'Reorder') {
        console.log(reorderButton, 'save changes')
        setReorderButton('Save Changes')
        setDisableDrag(false)
      } else if (reorderButton === 'Save Changes') {
        console.log(reorderButton, 'reorder')
        updateDayOrder(showTrip)
        setReorderButton('Reorder')
        setDisableDrag(true)
      }
    }

    function handleOnDragEnd(result) {
     
      console.log(result)
      console.log(showTrip)
      if (!result.destination) return;

      const days = showTrip
      const [reorderedDay] = days.tripDays.splice(result.source.index, 1)
      days.tripDays.splice(result.destination.index, 0, reorderedDay)

      setShowTrip(days)
      console.log('days after', days)

    }

    function updateDayOrder(showTrip){
      const tripId = showTrip.tripName.id
      const dayOrder = []

      showTrip.tripDays.forEach((day)=>{
        dayOrder.push(day.id)
      })
      console.log(dayOrder)

      console.log('update day order')
      axios
      .put(`trips/${tripId}`, {dayOrder})
      .then((response)=> console.log(response))
    }

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
    <div className="row d-flex justify-content-around">

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
    <h6>Submitted by <b>{showTrip.tripName.user.email}</b>, Updated on {showTrip.tripName.updatedAt.split("T")[0]}</h6>
    <h6> search id: {showTrip.tripName.id}</h6></> :
    <>
    <h2>{showTrip.tripName.name}</h2>
    <h4>{showTrip.tripName.length} days trip</h4>
    <h6>submitted by <b>{showTrip.tripName.user.email}</b>, updated on {showTrip.tripName.updatedAt.split("T")[0]}</h6>
    <h6> search id: {showTrip.tripName.id}</h6></>}
      
      {userIsAuthor &&
      <>
      <div className="col">
      <button className="button reorderButton" onClick={activateReorder}><i class="fa fa-reorder"> {reorderButton}</i>
        {/* Reorder days */}
        </button>

      </div>
      <div className="col">
        <button className="button" onClick={() => remove(showTrip.tripName.id)}><i class="fa fa-trash"> Entire Trip</i></button>
      </div>
      
      </>
      }
    </>}

    {showTrip && 
    <DragDropContext onDragEnd={handleOnDragEnd}>     
    <Droppable droppableId="days">
      {(provided)=> (

      <ul className="days"{...provided.droppableProps} ref={provided.innerRef}>
      {showTrip.tripDays.map((day, index)=>{
        return(
          <Draggable key={index} draggableId={index.toString()} index={index} isDragDisabled={disableDrag}>
            {(provided) => (
              <div className = "draggabledays"ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                <div className="row day" key={"day" + index + 1}>
                  <h4>Day {index + 1}, {day.country.name}</h4>
        
                  {userIsAuthor &&
                  <div className="row justify-content-center">
                  <>
                    <div className="col-1">
                      <button className="btn" onClick={() => edit(day.tripId, day.id)}><i class="fa fa-edit"></i></button>
                    </div>
                    <div className="col-1">
                      <button className="btn" onClick={() => removeDay(day.tripId, day.id)}><i class="fa fa-trash"></i></button>
                    </div></>
                  </div>
                  }

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
              </div>
            )}
          </Draggable>
          )
        })}    
        {provided.placeholder}
      </ul>
      )}
      </Droppable>
      </DragDropContext>
    }
    </div>
  )
}