import express from 'express'
import { routes } from './routes.js'
import cors from 'cors'
import {PORT} from './config.js'

const app = express()

app.use(cors())

app.set('port', PORT)


// middelwares----------------------------------------------------
app.use(express.json())

// routes --------------------------------------------------------
app.get('/', (req, res) => {
    res.send('Welcome to my APP 2022')
})

app.use('/api', routes)

app.listen(app.get('port'), ()=>{
    console.log(`server running to port ${app.get('port')}`)
})
