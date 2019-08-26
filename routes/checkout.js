const express = require('express');
const router  = express.Router();

const twilio = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("checkout");
  });

  router.post("/", (req, res) => {
  const numbers = [Number(process.env.TWILIO_NUMBER_SEND_1), Number(process.env.TWILIO_NUMBER_SEND_2)] ;
  const body = ['Your order has been placed! It will be ready in 25-30 minutes.', 'An order has been placed by Kevin!'];

  Promise.all(
    numbers.map((number, index) => {
      return twilio.messages.create({
        to: number,
        from: process.env.TWILIO_NUMBER,
        body: body[index]
      });
    })
  )
  .then(messages => {
      console.log('Messages sent!');
      req.session = null;
      res.redirect("/");
    }).catch(err => console.error(err))

  })
  return router;
};
