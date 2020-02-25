const express = require("express");
const router = express.Router();
const User = require('../../models/User');
const validateUserInfo = require('../../validations/user')
const db = require('../../config/keys').mongoURI;
const mongoose = require('mongoose');
const nodemailer = require('nodemailer')
require('dotenv').config()





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



const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const mailOptions = {
    from: 'dinderappaa@gmail.com',
    to: email, //where to send the email,
    subject: 'meet hoes on dinder',
    text: 'sup u fucking pussy'
}

// const emailbody = (

//   <h1>SUUUUP</h1>

// )

  newUser.save()
        .then(user => res.json(user))
        .then(() => transporter.sendMail(mailOptions, function(err, data) {
          if (err) {
              console.log('Error Occurs', err)
          } else {
              console.log('Email sent!!!')
          }
      }) )
})

  



module.exports = router;