import * as Users from '../models/Users'
const create = (req, res) => {
  const { email, nickname, password } = req.body
  const createdDateAt = Date.now()
  const respond = response => res.json({success: response.result.n})
  const onError = () => res.status(409).json({success: 0})
  Users.insertUser(email, nickname, password, createdDateAt)
  .then(respond)
  .catch(onError)
}

const login = (req, res) => {
  const { email } = req.body
  const verifyEmail = user => {
    if(!user) throw new Error('아이디가 없습니다.')
    return user 
  }
  const respond = user => {
    res.json({success: user})
  }
  const onError = (err) => {
    res.status(409).json({success: err.message})
  }
  Users.findUserByEmail(email)
  .then(verifyEmail) 
  .then(respond)
  .catch(onError)
}

export { create, login }