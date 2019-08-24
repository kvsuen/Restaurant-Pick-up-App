// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const pool = new Pool(dbParams);
pool.connect();

// Login: Checks the database for the user's email and password to Login

const userLogin = function(email, password) {
  return pool.query(`
  SELECT id
  FROM users
  WHERE email = $1 AND password = $2
  `, [email, password])
    .then(res => res.rows[0])
    .catch(err => console.error(null, err.stack));
};

exports.userLogin = userLogin;


// Register: Adds a user to the database

const userRegister = function(user) {
  return pool.query(`
  INSERT INTO users
  (
  id,
  name,
  email,
  password,
  phone_number
  )
  VALUES
  ($1, $2, $3, $4, $5) RETURNING *
  `, [user.id, user.name, user.email, user.password, user.phone_number])
  .then(res => res.rows)
  .catch(err => console.error(null, err.stack));
}

exports.userRegister = userRegister;

// Menu: Lists whole menu (items, price, picture, description)

const getMenu = function() {
  return pool.query(`
  SELECT *
  FROM menu_items
  `)
  .then(res => res.rows)
  .catch(err => console.error(null, err.stack));
}

exports.getMenu = getMenu;

// Order: Creates an order

const createOrder = function(order) {
  return pool.query(`
  INSERT INTO orders (order_time) VALUES ($1)
  INSERT INTO menu_items (item) VALUES ($2)
  INSERT INTO menu_items (price) VALUES ($3)
  INSERT INTO order_details (quantity) VALUES ($4)
  RETURNING *
  `, [order.order_time, order.item, order.price, order.quantity])
    .then(res => res.rows)
    .catch(err => console.error(null, err.stack));
}

exports.createOrder = createOrder;

// Purchase Price: Creates a record of price paid for each item

const purchasePrice = function(userid) {
  return pool.query(`
  INSERT INTO order_details (purchase_price) SELECT menu_items.price
  FROM users
  JOIN orders ON users.id = user_id
  JOIN order_details ON orders.id = order_details.order_id
  JOIN menu_items ON menu_items.id on order_details.menu_item_id
  WHERE users.id = $1
  RETURNING *
  `, [userid])
  .then(res => res.rows)
  .catch(err => console.error(null, err.stack));
}

exports.purchasePrice = purchasePrice;

// Total Price: Gets the total PURCHASE price for an order (PAST/PRESENT)

const totalPurchasePrice = function() {
  return pool.query(`
  SELECT SUM(purchase_price * quantity) as total_purchase_price
  FROM order_details
  `)
  .then(res => res.rows[0])
  .catch(err => console.error(null, err.stack));
}

exports.totalPurchasePrice = totalPurchasePrice;

// Total Price: Gets the total price for an order (PRESENT)

const totalPrice = function() {
  return pool.query(`
  SELECT SUM(menu_items.price * quantity) as total_price
  FROM order_details
  JOIN menu_items ON menu_items.id = menu_item_id
  `)
}

exports.totalPrice = totalPrice;

// Quantity of Items: Creates a record of quantity of menu items picked in an order

const quantityOfItems = function(items) {
  return pool.query(`
  INSERT INTO order_details (quantity)
  VALUES count(items)
  `, [items])
  .then(res => res.rows)
  .catch(err => console.error(null, err.stack));
}

exports.quantityOfItems = quantityOfItems;

// Order History: Shows order history (Menu Item, Purchase Price, Quantity, Total Price, Timestamp)

const userOrderHistory = function(id) {
  return pool.query(`
  SELECT
  orders.order_time as order_time
  menu_items.item as item,
  order_details.purchase_price as price,
  order_details.quantity as quantity,
  SUM(purchase_price * quantity) as total_price,
  FROM users
  JOIN orders ON users.id = user_id
  JOIN order_details ON orders.id = order_details.order_id
  JOIN menu_items ON menu_items.id on order_details.menu_item_id
  WHERE users.id = $1
  `, [id])
  .then(res => res.rows)
  .catch(err => console.error(null, err.stack));
}

exports.userOrderHistory = userOrderHistory;
