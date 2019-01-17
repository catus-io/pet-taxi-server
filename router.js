import express from 'express'
const router = express.Router()

router
  .get('/', (req, res) => res.send('ok'))
  .post('/signup', (req, res) => console.log('okay'))

export default router
