export default function initTripsController (db) {
  const show = async (req, res) => {
    try {
      const items = await db.Trip.findOne({
        where:{
          id: 1
        }
      })
      res.send({ items })
    } catch (error) {
      console.log(error)
    }
  }
  const create = async (req, res) =>{
    try {
      console.log(req.body.formData, 'tryy')
      const newTrip = await db.Trip.create({
        categoryId: 1,
        data: req.body.formData
      })

      const user = await db.User.findOne({
        where:{
          id: 1
        }
      })
  
      user.addTrip(newTrip)  
      
      res.send({newTrip})
    } catch (error) {
      console.log(error)
    }
  }

  return {
    show,
    create
  }
}