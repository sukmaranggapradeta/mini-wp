const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const mongoose = require('mongoose')
const articleRoutes = require('./routes/article')
const errHandling = require('./middlewares/errorHandling')  

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended:false }))

app.use('/articles', articleRoutes)

app.use(errHandling)

mongoose.connect('mongodb://localhost/mini-wp', { useNewUrlParser:true }, (err)=>{
    if (err) console.log('database not connect')
    else `Database connected`
})

app.listen(port, ()=>{
    console.log(`server running at port ${port}`)
})