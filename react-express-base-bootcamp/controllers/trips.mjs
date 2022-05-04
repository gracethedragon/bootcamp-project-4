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
      const country = await db.Country.findOne({
        where: {
          name:req.body.formData.country.country
        }
      })

      console.log(country)
      const newTrip = await db.Trip.create({
        userId: req.body.formData.userId,
        name: req.body.formData.title.title,
        length: 1,
      })
      console.log(newTrip.id, 'trip')

      const newDay = await db.Day.create({
        tripId: newTrip.id,
        countryId: country.id,
        data: req.body.formData.formFields,
        order: 1
      })
      await newTrip.addCountry(country)
      
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
      const length = await trip.increment('length')

      const newDayOrder = length.dataValues.length

      console.log(req.body.formData.country.country)

      const country = await db.Country.findOne({
        where: {
          name: req.body.formData.country.country
        }
      })
      console.log(country.id)

      const newDay = await db.Day.create({
        tripId: req.body.formData.title.id,
        data: req.body.formData.formFields,
        countryId: country.id,
        order: newDayOrder
      })

      await trip.addCountry(country) 
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
      console.log(req.params.id, 'tripId, showOne')
      const tripName = await db.Trip.findOne({
        where:{
          id: req.params.id
        }
      })
      const tripDays = await db.Day.findAll({
        where:{
          tripId: req.params.id
        },
        include: {
          model: db.Country
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
      await days.forEach(day=> {
        console.log(day.countryId, 'countryId')
        trip.removeCountry(day.countryId)})

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

      await db.Day.destroy({
        where:{
          id: dayId
        }
      })
      await trip.decrement('length')

      //deleted day country
      const otherDays = await db.Day.findAll({
        where:{
          countryId: day.countryId,
          tripId: tripId
        }
      })

      console.log(otherDays.length)
      // if only this day in the trip has this country, remove it from the many-to-many table
      if(otherDays.length === 0) {
        await trip.removeCountry(day.countryId)
      } 

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
        },
         include: {
          model: db.Country
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
      console.log(tripId, dayId, req.body.formData)
      const tripName = await db.Trip.findByPk(tripId)

      const country = await db.Country.findOne({
        where:{
          name: req.body.formData.country
        }
      })
      
      //original day details
      const day = await db.Day.findByPk(dayId)

      //updated day country
      const otherDays = await db.Day.findAll({
        where:{
          countryId: day.countryId,
          tripId: tripId
        }
      })

      console.log(otherDays.length)
      // if only this day in the trip has this country, remove it from the many-to-many table
      if(otherDays.length === 1) {
        await tripName.removeCountry(day.countryId)
      } 
      
      //update day details
      await db.Day.update({
        data: req.body.formData.formFields,
        countryId: country.id
      },{
        where:{
          tripId: tripId,
          id: dayId
        }
      })

      //update many-to-many table with newcountry pairing
      await tripName.addCountry(country.id)

      

      const tripDays = await db.Day.findAll({
        where:{
          tripId: tripId
        },
        include:{
          model: db.Country
        }
      })


      res.send({tripDays, tripName})
      
    }catch (error){
      console.log(error)
    }
  }

  const updateDayOrder = async(req,res)=>{
    try{
      
      const dayOrder = req.body.dayOrder
      console.log(dayOrder)
      for (let i = 0; i < dayOrder.length; i +=1 ){
        await db.Day.update({
        order: i + 1
        },{
        where:{
          id: dayOrder[i]
        }
        })
      }
    } catch (error){
      console.log(error,'updateDayOrder')
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
    editDay,
    updateDayOrder
  }
}