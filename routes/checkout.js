const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/checkout", (req, res) => {
    res.render("checkout");
  });

  router.post("/checkout", (req, res) => {
    // TO DO
    // Call a function to query database
    res.redirect('/');
  });

  return router;
};
