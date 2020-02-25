const express = require("express");
const router = express.Router();
const Session = require("../../models/Session");
const fs = require('fs');

router.get("/test", (req, res) => res.json({ msg: "This is the sessions route" }));

router.post("/new", (req, res) => {
 

  const newSess = new Session({
    numUsers: req.body.numUsers
  }); // choices array should auto populate unless otherwise specified

  newSess
    .save()
    .then(session => res.json(session));
});

router.patch("/:sessionId", (req, res) => {
  const session = Session.findOne({ id: req.params.sessionId});
  if(session){
    session
      .update({ completedUsers: req.params.completedUsers})
      .then(session => res.json(session));
  }
});

module.exports = router;