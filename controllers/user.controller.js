import * as Users from '../models/Users'

const create = (req, res) => {
  const { email, nickname, password } = req.body
  let userByEmail = null
  const findUserByEmail = () => Users.findUserOne({email: email})
  const findUserByNickname = user => {
    userByEmail = user; 
    return Users.findUserOne({nickname: nickname})
  }
  const insertUser = userByNickname => {
    const createdDateAt = Date.now()
    if(userByEmail) throw new Error('중복된 이메일 입니다.')
    if(userByNickname) throw new Error('중복된 닉네임 입니다.')
    return Users.insertUser({email: email, nickname: nickname, password: password, createdDateAt: createdDateAt})
  }
  const respond = response => res.json({success: response.result.n})
  const onError = err => res.status(409).json({success: err.message})

  findUserByEmail()
  .then(findUserByNickname)
  .then(insertUser)
  .then(respond)
  .catch(onError)
}

const login = (req, res) => {
  const { email, password } = req.body
  const findUserByEmail = () => Users.findUserOne({email: email})
  const createToken = user => {
    if(!user) throw new Error('이메일이 없습니다.')
    if(user.password !== password) throw new Error('비밀번호가 맞지 않습니다.')
    return Users.createToken(user)
  }
  const respond = token => res.json({success: token})
  const onError = (err) => res.status(409).json({success: err.message}) 

  findUserByEmail()
  .then(createToken) 
  .then(respond)
  .catch(onError)
}

export { create, login }