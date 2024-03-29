const express = require("express");
const router = express.Router();
const Session = require("../../models/Session");
const fs = require('fs');
const nodemailer = require('nodemailer');
const keys = require('../../config/keys');
const emailaddress = require('../../config/keys').EMAIL;
const emailpw = require('../../config/keys').PASSWORD;
const hbs = require('nodemailer-express-handlebars');
const secret_sauce = keys.DINDER_SECRET_SAUCE;
const secret_key = keys.DINDER_SECRET_KEY;
const axios = require('axios');

router.get("/test", (req, res) => res.json({ msg: "This is the sessions route" }));

router.get('/index', (req, res) => {
  Session.find({}, (err, data) => {
    return res.json(data);
  });
});

router.post('/restaurants', (req, res) => {
  const cuisine = req.body.cuisine || 'restaurants';
  const location = req.body.location || 'NYC';
  const options = {
    headers: {
      Authorization: `Bearer ${secret_key}`
    },
    data: {
      location: location,
      limit: 10,
      categories: cuisine,
      id: req.body._id
    }
  };
  
  axios.get(`${secret_sauce}?location=${options.data.location}&term=${options.data.categories}&limit=10`, { headers: { Authorization: `Bearer ${secret_key}` } })
    .then((api, err) => {

      if (err) {
     
        res.status(404).json({ err: 'sup' });
      }
      const formattedRes = api.data.businesses.map(rest => {
        return ({
          name: rest.name,
          imgUrl: rest.image_url,
          sauceUrl: rest.url,
          reviews: rest.review_count,
          rating: rest.rating,
          dollarSigns: rest.price,
          street: rest.location.display_address[0] || "",
          city: rest.location.display_address[1] || ""
        });
      });
      const returnInfo = {
        restaurants: formattedRes,
        session: options.data.id
      };
     
      return res.json(returnInfo);
    })
    .catch(() => {
      console.log("inside .catch")
    })
});

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
    numUsers: req.body.numUsers,
    cuisine: req.body.cuisine,
    location: req.body.location
  }); 

  newSess
    .save()
    .then(session => res.json(session));
});

router.patch("/:sessionId", (req, res) => {
  let arg2 = {};
  if (req.body.winner) {
    arg2.winner =  req.body.winner;
  } else if (req.body.completedUsers) {
    arg2.completedUsers = req.body.completedUsers;
  } else if (req.body.restaurants) {
    arg2.restaurants = req.body.restaurants; 
  };
  
  function sendEmails (completedUsers, winner, url) {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: emailaddress,
          pass: emailpw
        }
      });

      transporter.use('compile', hbs({
        viewEngine: {
          extName: '.handlebars',
          partialsDir: './views/api/sessions',
          layoutsDir: './views/api/sessions',
          defaultLayout: 'winner.handlebars'},
        viewPath: './views/api/sessions',
      }));

      const mailOptions = {
        from: 'dinderappaa@gmail.com',
        subject: "Dinder has been chosen!",
        template: 'winner',
        attachments: [{
          filename: 'logowinner.png',
          path: __dirname + '/logowinner.png',
          cid: 'logowinner'}],
        context: {
          winner: winner,
          url: url
        }
      };

      completedUsers.forEach(user => {
          mailOptions.to = user.email, 
          mailOptions.context.email = user.email
          transporter.sendMail(mailOptions, function(err, data) {
            if (err) {
                console.log('Error Occurs', err)
            } else {
                console.log('Winner email sent!!!')
            }
          })
      })
    };

  Session.findOneAndUpdate(
    { _id: req.params.sessionId}, 
    arg2,
    {upsert: false}, 
    (err, session) => {
      if (err) {
        return (res.status(422).json({err: err})); 
      } else {
        if (arg2.winner) {
          sendEmails(req.body.completedUsers, req.body.winner, req.body.url);
        }
        return res.json(session);
      }
    }
  )
});

module.exports = router;