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
        categoryId: 1,
        name: req.body.formData.title,
        data: req.body.formData.formFields
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