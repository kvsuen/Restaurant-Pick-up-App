// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT          = process.env.PORT || 8080;
const ENV           = process.env.ENV || "development";
const express       = require("express");
const bodyParser    = require("body-parser");
const sass          = require("node-sass-middleware");
const app           = express();
const morgan        = require('morgan');
const cookieSession = require('cookie-session');

// PG database client/connection setup	const db = require('./database');
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// TEMPORARY DATABASE OBJECT STRUCTURE
const users = [
  {
    id: 0,
    name: "test",
    email: "test@test.com",
    password: "test",
    phoneNumber: 1231231234,
    creditCardNumber: 1234123412341234,
    cardExpiryDate: 1120,
    cardSecurityCode: 123
  }
];

const userOrder = [
  {
    menuItem: "fries",
    quantity: 3,
    purchasePrice: 500
  },
  {
    menuItem: "krab",
    quantity: 3,
    purchasePrice: 50000
  }
];

// Cookie session setup
app.use(cookieSession({
  name: "session",
  keys: ["KAK"],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
const usersRoutes = require("./routes/users");
const loginRoutes = require("./routes/login");
const logoutRoutes = require("./routes/logout");
const registerRoutes = require("./routes/register");
const ordersRoutes = require("./routes/orders");
const checkoutRoutes = require("./routes/checkout");

// Mount all resource routes
app.use("/api/users", usersRoutes(db));
app.use("/login", loginRoutes(db));
app.use("/logout", logoutRoutes(db));
app.use("/register", registerRoutes(db));
app.use("/orders", ordersRoutes(db));
app.use("/checkout", checkoutRoutes(db));

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`KAK listening on port ${PORT}`);
});
