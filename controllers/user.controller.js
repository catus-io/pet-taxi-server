import * as Users from '../models/Users'

const create = (req, res) => {
  const { email, nickname, password } = req.body

  const findUserByNickname = user => {
    if(user) throw new Error('중복된 이메일 입니다.')
    return Users.findUserOne({nickname: nickname})
  }
  const insertUser = user => {
    if(user) throw new Error('중복된 닉네임 입니다.')
    const createdDateAt = Date.now()
    return Users.insertUser(email, nickname, password, createdDateAt)
  }
  const respond = response => res.json({success: response.result.n})
  const onError = err => res.status(409).json({success: err.message})

  Users.findUserOne({email: email})
  .then(findUserByNickname)
  .then(insertUser)
  .then(respond)
  .catch(onError)
}

const login = (req, res) => {
  const { email, password } = req.body
  const createToken = user => {
    if(!user) throw new Error('이메일이 없습니다.')
    if(user.password !== password) throw new Error('비밀번호가 맞지 않습니다.')
    return Users.createToken(user)
  }
  const respond = token => res.json({success: token})
  const onError = (err) => res.status(409).json({success: err.message}) 

  Users.findUserOne({email: email})
  .then(createToken) 
  .then(respond)
  .catch(onError)
}

export { create, login }