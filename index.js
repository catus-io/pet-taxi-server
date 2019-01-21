import app from './config/app.config'
import router from './router'

app.use('/api', router)

app.listen(3000, () => console.log(`This server has been started with port ${app.get('port')}`))