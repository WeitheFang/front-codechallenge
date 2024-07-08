import express from 'express'
import cors from 'cors'
import playersRoute from './routes/playersRoute'
import * as dotenv from 'dotenv'
import {AppDataSource} from './data-source'

dotenv.config()

const app = express()
const port = process.env.PORT || 3800

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
    allowedHeaders: ['Content-Type', 'authtoken', 'Authorization']
}

app.use(cors(corsOptions))

app.use(express.json())
app.use('/', playersRoute)

AppDataSource.initialize()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`)
        })
    })
    .catch(err => {
        console.error('Error during Data Source initialization:', err)
    })
