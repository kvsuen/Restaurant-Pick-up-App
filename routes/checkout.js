const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("checkout");
  });

  router.post("/", (req, res) => {
    // TO DO
    // Call a function to query database
    res.redirect("/");
  });

  return router;
};
