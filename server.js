const express = require('express')
const mysql = require('mysql')
const myconn = require('express-myconnection')
const routes = require('./routes')
const cors = require('cors')

const app = express()

app.use(cors())

app.set('port', 9000)

const dbOptions = {
    host: 'localhost',
    port: '3306',
    user: 'brayan',
    password: 'N2@tc$ib%*9*Bg',
    database: 'library'
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
