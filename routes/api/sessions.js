const express = require("express");
const router = express.Router();
const Session = require("../../models/Session");
const fs = require('fs');

router.get("/test", (req, res) => res.json({ msg: "This is the sessions route" }));

router.get("/:sessionId", (req, res) => {
  Session.findOne({ _id: req.params.sessionId }, (err, session) => {
    // debugger
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
  const session = Session.findOne({ id: req.params.sessionId});
  if(session){
    session.update({ completedUsers: req.params.completedUsers})
    if (session.numUsers === session.completedUsers.length) {
      
    }
  }
});

module.exports = router;