import cookieParser from 'cookie-parser'

export default function initUsersController (db) {
  const create = async (req,res) =>{
    console.log(req.body)
    const user = await db.User.create({
      email: req.body.userFields.email,
      password: req.body.userFields.password
    })
    res.send(user.email)
  }
  const login = async (req,res) =>{
    console.log(req.body)
    const user = await db.User.findOne({
      where:{
        email: req.body.userFields.email,
        password: req.body.userFields.password
      }
    })
    if(user) {
      res.cookie('loggedIn', user.email)
      res.cookie('userId', user.id)
      res.send(user)
    } else {
      res.send('failed')
    }
  }
  return {
    create,
    login
  }
}