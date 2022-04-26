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
        name: req.body.formData.title,
        length: 2,
        country: 'placholder',  
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
      const trip = await db.Trip.findOne({
        where:{
          id: 1
        }
      })

      const newDay = await db.Day.create({
        tripId: 1,
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
      const myTrips = await db.Trip.findAll({
        where:{
          userId: 1
        }
      })
      res.send({myTrips})
    } catch (error){
      console.log(error)
    }
  }

  return {
    show,
    create,
    add,
    showMine
  }
}