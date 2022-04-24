import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDatabse from './config/MongoDb.js'
import importData from './DataImport.js'
import productRoute from './Routes/ProductRoutes.js'
import { notFound, errorHandler } from './Middleware/Error.js'
import userRoute from './Routes/UserRoutes.js'
import orderRoute from './Routes/OrderRoutes.js'
import mailRoute from './Routes/MailRoutes.js'

dotenv.config()
connectDatabse()
const app = express()
app.use(express.json())
app.use(cors())


//api
app.use('/api/import', importData)
app.use('/products', productRoute)
app.use('/users', userRoute)
app.use('/orders', orderRoute)
app.use('/mailorder', mailRoute)
app.get('/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

app.get('/', (req, res) => {
  res.send('app is running')
})

//Error handlers
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server running port ${PORT}`))
