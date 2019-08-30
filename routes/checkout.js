const express = require('express');
const router  = express.Router();

const twilio = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

module.exports = (db) => {
  router.get("/", (req, res) => {

    let templateVars = {};

    Promise.all([db.getMenu("main"), db.getMenu("appetizer"), db.getMenu("dessert"), db.getMenu("drink"), db.getUser(req.session.userId)])
      .then((values) => {
        templateVars.mains = values[0];
        templateVars.appetizers = values[1];
        templateVars.desserts = values[2];
        templateVars.drinks = values[3];
        templateVars.user = values[4];

        res.render("checkout", templateVars);
      })
      .catch(err => console.error(null, err.stack));

  });

  router.post("/", (req, res) => {
    const numbers = [Number(process.env.TWILIO_NUMBER_SEND_1), Number(process.env.TWILIO_NUMBER_SEND_2)] ;
    const body = ['Your order has been placed! It will be ready in 25-30 minutes.', 'An order has been placed by Kevin!'];

    db.createOrderTime(req.session.userId)
      .then((values) => {
        for (const item of req.body.data) {
          db.createOrderQuantity(item, values[0].user_id)
        }
    }).catch(err => console.error(null, err.stack));


    // console.log('body', req.body);

    Promise.all([
      numbers.map((number, index) => {
        return twilio.messages.create({
          to: number,
          from: process.env.TWILIO_NUMBER,
          body: body[index]
        });
      })]
    )
    .then(messages => {
        console.log('Messages sent!');
        res.send({hello: "success"});
        // res.redirect("/");
      }).catch(err => console.error(err))
  })

  return router;
};

