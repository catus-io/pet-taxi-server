import express from 'express'
const router = express.Router()
import * as userController from './controllers/user.controller'
import * as bookingController from './controllers/booking.controller'

router
  .get('/', (req, res) => res.send('ok'))
  .post('/signup', userController.create)
  .post('/signin', userController.login)
  .post('/verify', userController.verifyToken)
  .post('/search', bookingController.searchAddr)
  .post('/book', bookingController.create)

export default router
