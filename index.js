const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { User } = require("./modules/User");
const { auth } = require("./middleware/auth");

//application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true }));

//application/json 
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...')).catch(err=>console.log(err))

app.get('/', (req, res) => res.send('Hello World~~~!'))

app.post('/api/users/register', (req, res) => {
    const user = new User(req.body)

    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/api/users/login', (req, res) => {

    User.findOne({ email: req.body.email }, (err, user) => {
  
      if (!user) {
        return res.json({
          loginSuccess: false,
          message: "Not founded"
        })
      }
  
      user.comparePassword(req.body.password, (err, isMatch) => {

        if (!isMatch)
          return res.json({ loginSuccess: false, message: "Incorrect password" })
  
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
  
          res.cookie("x_auth", user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id })
        })
      })
    })
  })

  //role=0 -> user, role!=0 -> admin
  app.get('/api/users/auth', auth , (req, res) => {
    res.status(200).json({
      _id: req.user._id,
      isAdmin: req.user.role === 0 ? false : true,
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname,
      role: req.user.role,
      image: req.user.image
    })
  })
  
  const port = 5000
  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
