const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    // TODO
    // Do error checking (helper func)
    res.redirect("/");
  });

  return router;
};
