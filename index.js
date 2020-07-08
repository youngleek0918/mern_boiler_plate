
const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
const connect = mongoose.connect('mongodb+srv://youngleek:qwer1234@boilerplate.qmskl.mongodb.net/<dbname>?retryWrites=true&w=majorit',
    {
      useNewUrlParser: true, useUnifiedTopology: true,
      useCreateIndex: true, useFindAndModify: false
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))