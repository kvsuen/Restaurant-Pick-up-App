-- Drop and recreate order_details table

DROP TABLE IF EXISTS order_details CASCADE;
CREATE TABLE order_details (
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id INTEGER references menu_items(id) ON DELETE CASCADE,
  purchase_price INTEGER,
  quantity INTEGER
);
