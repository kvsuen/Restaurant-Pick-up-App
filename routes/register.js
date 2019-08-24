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
    // Call a function to make an INSERT query to database
    res.redirect('/');
  });

  return router;
};
