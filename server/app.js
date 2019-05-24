const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const articleRoutes = require('./routes/article')
const userRoutes = require('./routes/user')
const apiRoute = require('./routes/api')
const errHandling = require('./middlewares/errorHandling')

dotenv.config()

app.use(cors())
app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended:false }))

app.get('/', (req, res)=>{
    res.send('welcome...')
})
app.use('/articles', articleRoutes)
app.use('/users', userRoutes)
app.use('/api', apiRoute)

app.use(errHandling)

// mongoose.connect(`mongodb://localhost/mini-wp`, { useNewUrlParser:true }, (err)=>{
mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser:true }, (err)=>{
    if (err) console.log('database not connect')
    else console.log(`Database connected`)
})

app.listen(port, ()=>{
    console.log(`server running at port ${port}`)
})
