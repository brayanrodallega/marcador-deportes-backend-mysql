const express = require('express')
const mysql = require('mysql2')
const myconn = require('express-myconnection')
const routes = require('./routes')
const cors = require('cors')

const app = express()
const config = require('./config')

app.use(cors())

app.set('port', config.port_server || 3001)

const dbOptions = {
    host: config.host_db,
    port: config.port_db,
    user: config.user_db,
    password: config.password_db,
    database: config.name_db,
}

// middelwares----------------------------------------------------
app.use(myconn(mysql, dbOptions, 'single'))
app.use(express.json())

// routes --------------------------------------------------------
app.get('/', (req, res) => {
    res.send('Welcome to my APP 2022')
})

app.use('/api', routes)

app.listen(app.get('port'), ()=>{
    console.log(`server running to port ${app.get('port')}`)
})
