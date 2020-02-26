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


router.post("/create",
  (req, res) => {
  const { errors, isValid } = validateUserInfo(req.body)
  const { session, email } = req.body

  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  session_number = '';

  for (let i =0; i < 6; i++) {
    let firstNum = (Math.random()* 10)
    let realNum = Math.floor(firstNum)
    session_number += realNum
  }

  const newUser = new User({
    email: email,
    session: session,
    session_code: session_number
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


const mailOptions = {
    from: 'dinderappaa@gmail.com',
    to: email, 
    subject: "You've been invited to a Dinder party!",
    template: 'create',
    context: {
      email: email,
      session_code: session_number
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
})

  



module.exports = router;