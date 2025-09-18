const express = require('express')

const cors = require('cors')

const cookieParser = require('cookie-parser')

const bodyParser = require('body-parser')

const mongoose = require('mongoose')

const app = express()

app.use(cors())

app.use(cookieParser())

app.use(bodyParser.json())

const PORT = 8000

mongoose.connect('mongodb://127.0.0.1:27017/jwt_token').then(()=>console.log("DB Connected")).catch((er)=>console.log(er.message))

app.use(require('./route/UserRoute'))

app.listen(PORT , ()=>console.log(`${PORT} port listening`))

