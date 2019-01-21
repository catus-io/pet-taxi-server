import express from 'express'
const router = express.Router()

// const userController = require('./controllers/user.controllers')
import * as userController from './controllers/user.controller'

router
  .get('/', (req, res) => res.send('ok'))
  .post('/signup', userController.create)
  .post('/signin', userController.login)
  // .post('/signup', (req, res) => console.log('okay'))

export default router
