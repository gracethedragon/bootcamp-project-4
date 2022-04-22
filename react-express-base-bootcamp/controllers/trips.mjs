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
      console.log(req.body)
      const newTrip = await db.Trip.create({
        categoryId: 1,
        data: req.body.data
      })
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