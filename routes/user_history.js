const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/orders", (req, res) => {
    let templateVars = {};
    Promise.all([db.userOrderHistory(req.session.userId), db.getUser(req.session.userId)])
      .then((values) => {
        let sum = 0;

        for (const iterator of values[0]) {
          sum += Number(iterator.total_price);
        }

        templateVars.orders = values[0];
        templateVars.user = values[1];
        templateVars.sum = sum;
        res.render("user_history", templateVars);
      })
      .catch(err => console.error(null, err.stack));

  });

  return router;
};
