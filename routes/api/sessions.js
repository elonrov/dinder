const express = require("express");
const router = express.Router();
const Session = require("../../models/Session");

router.get("/test", (req, res) => res.json({ msg: "This is the sessions route" }));

router.post("/session/new", (req, res) => {
  const newSess = new Session(); // choices array should auto populate unless otherwise specified

  newSess
    .save()
    .then(session => res.json(session));
});

router.patch("/session/:sessionId", (req, res) => {
  const session = Session.findOne({ id: req.params.sessionId});
  if(session){
    session
      .update({ completedUsers: req.params.completedUsers})
      .then(session => res.json(session));
  }
});

module.exports = router;