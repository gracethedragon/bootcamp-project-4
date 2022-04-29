export default function initTripsController (db) {
  const show = async (req, res) => {
    try {
      const items = await db.Trip.findAll()
      res.send({ items })
    } catch (error) {
      console.log(error)
    }
  }
  const create = async (req, res) =>{
    try {
      console.log(req.body, 'tryy')
      const newTrip = await db.Trip.create({
        userId: 1,
        name: req.body.formData.title.title,
        length: 1,
        country: req.body.formData.title.country,  
      })
      console.log(newTrip.id, 'trip')

      const newDay = await db.Day.create({
        tripId: newTrip.id,
        data: req.body.formData.formFields
      })
      await newTrip.addDay(newDay)
      
      res.send(newDay)
    } catch (error) {
      console.log(error)
    }
  }

  const add = async (req, res)=>{
    try{
      console.log('running')
      console.log(req.body.formData.title.id)
      const trip = await db.Trip.findOne({
        where: {
          id: req.body.formData.title.id
        }
      })

      await trip.increment('length')

      const newDay = await db.Day.create({
        tripId: req.body.formData.title.id,
        data: req.body.formData.formFields
      })


      await trip.addDay(newDay) 
      res.send(newDay)
    } catch (error) {
    console.log(error)
    }
  }

  const showMine = async(req,res)=>{
    try {
    const userId = req.params.userId
      const myTrips = await db.Trip.findAll({
        where:{
          userId: userId
        }
      })
      res.send({myTrips})
    } catch (error){
      console.log(error)
    }
  }

  const showOne = async (req,res)=>{
    try{
      console.log(req.params.id, 'tripId')
      const tripName = await db.Trip.findOne({
        where:{
          id: req.params.id
        }
      })
      const tripDays = await db.Day.findAll({
        where:{
          tripId: req.params.id
        }
      })

      res.send({tripDays, tripName})
    }catch (error){
      console.log(error)
    }
  }

  const removeTrip = async(req,res)=>{
    try{
      const tripId = req.params.tripId

      const trip = await db.Trip.findByPk(tripId)
      const days = await db.Day.findAll({
        where: {
          tripId: tripId
        }
      })
      await trip.removeDays(days)

      await db.Day.destroy({
        where:{
          tripId: tripId
        }
      })
      
      await db.Trip.destroy({
        where:{
          id: tripId
        }
      })
      res.send('destroyed') 
    } catch  (error){
      console.log(error)
    }
  } 

  const removeDay = async(req,res) => {
    try {
      const tripId = req.params.tripId
      const dayId = req.params.dayId

      const trip = await db.Trip.findByPk(tripId)
      const day = await db.Day.findOne({
        where: {
          id: dayId
        }
      })
      await trip.removeDay(day)

      await db.Day.destroy({
        where:{
          id: dayId
        }
      })

      await trip.decrement('length')
      res.send('destroyed') 
    } 
    catch (error) {
      console.log(error)
    }
  }

  const showDay = async(req,res)=>{
    try{
      const tripId = req.params.tripId
      const dayId = req.params.dayId
      const trip = await db.Trip.findByPk(tripId)
      const day = await db.Day.findOne({
        where:{
          tripId:  tripId,
          id: dayId
        }
      })
      res.send({day, trip})
    }catch (error){
      console.log(error)
    }
  }

  const editDay = async(req,res)=>{
    try{
      const tripId = req.params.tripId
      const dayId = req.params.dayId
      console.log(tripId, dayId, req.body.formData.formFields)
      const tripName = await db.Trip.findOne({
        where:{
          id: tripId
        }
      })

      await db.Day.update({
        data: req.body.formData.formFields},
        {where:{
          tripId: tripId,
          id: dayId
        }
      })

      const tripDays = await db.Day.findAll({
        where:{
          tripId: tripId
        }
      })

      res.send({tripDays, tripName})
      
    }catch (error){
      console.log(error)
    }
  }

  return {
    show,
    create,
    add,
    showMine,
    showOne, 
    removeTrip,
    removeDay,
    showDay,
    editDay
  }
}