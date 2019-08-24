const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const {email, password} = req.body;
    console.log(email, password);

    db.userLogin(email, password)
      .then(id => {
        if (!id) {
          res.send({error: "error"});
          return;
        } else {
          console.log(id);
          req.session.userId = id.id;
          res.redirect("/");
        }
      }).catch(err => console.error(null, err.stack));


  });

  return router;
};
