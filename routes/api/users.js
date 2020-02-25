const express = require("express");
const router = express.Router();
const User = require('../../models/User');
const validateUserInfo = require('../../validations/user')
const db = require('../../config/keys').mongoURI;

router.post("/create", (req, res) => {
  const { errors, isValid } = validateUserInfo(req.body)
  const { session, email } = req.body

  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  session_number = '';

  for (let i =0; i < 6; i++) {
    let decnum = (Math.random()* 10)
    let newnum = Math.floor(decnum)
    session_number += newnum
  }

  const newUser = new User({
    email: req.body.email,
    session: req.body.session,
    session_code: session_number
  })

  newUser.save()
        .then(user => res.json(user))


})

  



module.exports = router;