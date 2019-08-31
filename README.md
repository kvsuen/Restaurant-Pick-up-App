# Restaurant Pick-up Ordering App

A food ordering experience for a single restaurant. Hungry clients of this fictitious restaurant can visit the website, select one or more dishes and place an order for pick-up. They will receive a notification when their order is ready.

The restaurant and client are both notified via SMS using Twilio's API service for SMS communication.

This app was developed using Node.js, Express, PostgreSQL on the back-end and EJS, jQuery, AJAX for the front-end rendering.

## Contributors
* [Kevin Yoo](https://github.com/kyoo95)
* [Azzam Athar](https://github.com/Azzycodes)
* [Kevin Suen](https://github.com/kvsuen)

## Final Product
Ordering page:
![Ordering page](https://i.gyazo.com/b3444799b319f8cc1e2913fa136b53a8.gif)

<p align="center">
  <img width="400" height="750" alt="SMS notification for new order sent to Restaurant" src="https://github.com/kvsuen/Restaurant-Pick-up-App/raw/master/docs/SMS_to_restaurant.jpg">
</p>

<p align="center">
  <img width="400" height="750" alt="SMS notification for new order sent to user" src="https://github.com/kvsuen/Restaurant-Pick-up-App/raw/master/docs/SMS_to_client.png">
</P

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information :
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Update the .env file with API keys:
  - TWILIO_ACCOUNT_SID
  - TWILIO_AUTH_TOKEN
  - TWILIO_NUMBER and verified numbers for SMS communication
  - Google reCAPTCHA API key
4. Install dependencies: `npm i`
5. Fix to binaries for sass: `npm rebuild node-sass`
6. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://127.0.0.1:8080/`

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- body-parser: 1.19.0,
- chalk: 2.4.2,
- cookie-session: 1.3.3,
- dotenv: 2.0.0,
- ejs: 2.6.2,
- express: 4.17.1,
- morgan: 1.9.1,
- node-env-run: 3.0.2,
- node-sass-middleware: 0.11.0,
- pg-native: 3.0.0,
- twilio: 3.33.4
