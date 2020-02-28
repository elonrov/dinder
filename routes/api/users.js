const express = require("express");
const router = express.Router();
const User = require('../../models/User');
const validateUserInfo = require('../../validations/user')
const db = require('../../config/keys').mongoURI;
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv').config();
const hbs = require('nodemailer-express-handlebars');
const path = require('path')
const Session = require('../../models/Session')
const secret_sauce = process.env.DINDER_SECRET_SAUCE;
const secret_key = process.env.DINDER_SECRET_KEY;
const axios = require('axios');


router.get('/restaurants', (req, res) => {
  const cuisine = req.cuisine || 'taco';

  const options = {
    headers: {
      Authorization: `Bearer ${secret_key}`
    },
    data: {
      location: 'NYC',
      limit: 10,
      catagories: cuisine
    }
  }

  axios.get(`${secret_sauce}?location=${options.data.location}&term=${options.data.catagories}&limit=10`, {headers: {Authorization: `Bearer ${secret_key}`}})
    .then((api, err) => {

      if (err) {
        res.status(404).json({err: 'sup'})
      }
      const formattedres = api.data.businesses.map(rest => {
        return ({
          name: rest.name,
          imgUrl: rest.image_url,
          sauceUrl: rest.url,
          reviews: rest.review_count,
          rating: rest.rating, 
          dollarSigns: rest.price,
          address: rest.location.display_address
        })
      })

      return res.json(formattedres)
    })
})

router.post('/show', (req, res)=> {
  User.find({sessionId: req.body.sessionId}, (err, users) =>{
    
    let correctUser = null;
    users.forEach(user => {
      
      if (user.sessionCode === parseInt(req.body.sessionCode)) {
        correctUser = user;
      }
    })
    
    if (correctUser) {
      return res.json(correctUser)
    } else {
      return res.status(404).json({err: 'Incorrect Session Code'})
    }
  })
})

router.post("/create",
  (req, res) => {
  const { errors, isValid } = validateUserInfo(req.body)
  const { sessionId, email } = req.body

  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  session_number = '';

  for (let i =0; i < 6; i++) {
    let firstNum = (Math.random()* 10)
    let realNum = Math.floor(firstNum)
    session_number += realNum
  }

  if (!req.body.host) {

  const newUser = new User({
    email: email,
    sessionId: sessionId,
    sessionCode: session_number
  })

  let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
      }
  });

  transporter.use('compile', hbs({
    viewEngine: {
      extName: '.handlebars',
      partialsDir: './views/api/users',
      layoutsDir: './views/api/users',
      defaultLayout: 'create.handlebars'},
    viewPath: './views/api/users',
  }));

  const url = `localhost:3000/#/round?${sessionId}`


  const mailOptions = {
      from: 'dinderappaa@gmail.com',
      to: email, 
      subject: "You've been invited to a Dinder party!",
      template: 'create',
      context: {
        email: email,
        sessionCode: session_number,
        sessionurl: url
      }
    }
  
  newUser.save()
      .then((user) => res.json(user))
      .then(() => transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            console.log('Error Occurs', err)
        } else {
            console.log('Email sent!!!')
        }
    }) )
      .catch((errors) => console.log('you have errors!', errors)) 
  } else {

    const newUser = new User({
      email: email,
      sessionId: sessionId,
      sessionCode: session_number,
      host: true
    })
  
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
  
    transporter.use('compile', hbs({
      viewEngine: {
        extName: '.handlebars',
        partialsDir: './views/api/users',
        layoutsDir: './views/api/users',
        defaultLayout: 'createHost.handlebars'},
      viewPath: './views/api/users',
    }));
  
    const url = `localhost:3000/#/round?${sessionId}`
  
  
    const mailOptions = {
        from: 'dinderappaa@gmail.com',
        to: email, 
        subject: "You've been invited to a Dinder party!",
        template: 'createHost',
        context: {
          email: email,
          sessionCode: session_number,
          sessionurl: url
        }
      }
    
    newUser.save()
        .then((user) => res.json(user))
        .then(() => transporter.sendMail(mailOptions, function(err, data) {
          if (err) {
              console.log('Error Occurs', err)
          } else {
              console.log('Email sent!!!')
          }
      }) )
        .catch((errors) => console.log('you have errors!', errors)) 

  }

  
})

router.patch("/:userId", (req, res) => {
  User.findOne({ _id: req.params.userId}, (err, user) => {
    debugger
    if(user){
      if (req.body.rejections) {
        user.rejections = req.body.rejections
      }

      user.save(function(errors, updatedUser){
        if(errors) {
          return res.status(500).json({err: errors})
        } else {
          return res.json(updatedUser)
        }
      })

    } else {
      return res.status(404).json({err: 'That user does not exist'})
    }
  })
})





module.exports = router;