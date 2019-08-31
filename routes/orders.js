const express = require('express');
const router = express.Router();

module.exports = db => {
  router.get('/', (req, res) => {
    let templateVars = {};

    Promise.all([
      db.getMenu('main'),
      db.getMenu('appetizer'),
      db.getMenu('dessert'),
      db.getMenu('drink'),
      db.getUser(req.session.userId)
    ])
      .then(values => {
        templateVars.mains = values[0];
        templateVars.appetizers = values[1];
        templateVars.desserts = values[2];
        templateVars.drinks = values[3];
        templateVars.user = values[4];
        res.render('orders', templateVars);
      })
      .catch(err => console.error(null, err.stack));
  });
  return router;
};
