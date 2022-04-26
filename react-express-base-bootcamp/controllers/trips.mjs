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
        country: 'placeholder',  
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