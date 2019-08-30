const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("register");
  });

  router.post("/", (req, res) => {
    // TODO
    // Do error checking (helper func)
    // Check for empty form fields
    const user = req.body;
    db.userRegister(user)
      .then(id => {
        if (!id) {
          res.send({error: "error"});
          return;
        } else {
          req.session.userId = id[0].id;
          res.redirect("/");
        }
      }).catch(err => console.error(null, err.stack));
  });

  return router;
};
