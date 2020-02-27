const express = require("express");
const router = express.Router();
const Session = require("../../models/Session");
const fs = require('fs');
const nodemailer = require('nodemailer');
require('dotenv').config();
const hbs = require('nodemailer-express-handlebars');

router.get("/test", (req, res) => res.json({ msg: "This is the sessions route" }));


router.get('/index', (req, res) => {
  Session.find({}, (err, data) => {
    return res.json(data)
  })
})

router.get("/:sessionId", (req, res) => {
  Session.findOne({ _id: req.params.sessionId }, (err, session) => {
    if (session) {
      return res.json(session);
    } else {
      return res.status(404).json({ err: 'Session Not Found' });
    }
  });
});
router.post("/new", (req, res) => {
 

  const newSess = new Session({
    numUsers: req.body.numUsers
  }); // choices array should auto populate unless otherwise specified



  newSess
    .save()
    .then(session => res.json(session));
});

router.patch("/:sessionId", (req, res) => {
  Session.findOne({ _id: req.params.sessionId}, function(err, session){
    if(err) {
      return res.status(404).json({err: 'That session does not exist'})
    } else {
      if (req.body.winner) {
        session.winner = req.body.winner

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
          partialsDir: './views/api/sessions',
          layoutsDir: './views/api/sessions',
          defaultLayout: 'winner.handlebars'},
        viewPath: './views/api/users',
      }));

      const url = `localhost:3000/#/what do i put here`

      const emailList = []

      sessoion.completedUsers.forEach(user => {
        emailList.push(user.email)
      })

      const mailOptions = {
        from: 'dinderappaa@gmail.com',
        to: emailList, 
        subject: "Dinder has been chosen!",
        template: 'winner',
        context: {
          email: email,
          sessionCode: session_number,
          sessionurl: url
        }
      }

      transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            console.log('Error Occurs', err)
        } else {
            console.log('Email sent!!!')
        }
      })



      } if (req.body.completedUsers) {
        session.completedUsers = req.body.completedUsers
      }

      session.save(function(err, updatedSession) {
        if(err) {
          return res.status(500).json({err: err})
        } else {
          return res.json(updatedSession)
        }
      })
    }
  });

});

module.exports = router;