import * as Users from '../models/Users'
const create = (req, res) => {
  const { email, nickname, password } = req.body
  const createdDateAt = Date.now()
  
  
  Users.insertUser(email, nickname, password, createdDateAt)
  .then(result => {
    // console.log(result)

  })
/** 처리 해야할 사안
  const addUser = user => {
    if(user) throw new Error('user already exists')
    return User.insertUser(id, password)
  }
  const respond = response => res.json({success: response.result.n})
  const onError = () => res.status(409).json({success: 0})
  Users.findUserByEmail(email)
  .then(addUser)
  .then(respond)
  .catch(onError)
  */
}

const login = (req, res) => {
  console.log('hello im login') 

}

export { create, login }