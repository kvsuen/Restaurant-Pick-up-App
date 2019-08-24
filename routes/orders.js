const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/orders", (req, res) => {
    res.render("orders");
  });
  return router;
};
