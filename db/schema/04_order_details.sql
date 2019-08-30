-- Drop order_details table (remove on deploy)

DROP TABLE IF EXISTS order_details CASCADE;

-- Create order_details table

CREATE TABLE order_details (
  id SERIAL PRIMARY KEY NOT NULL,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id INTEGER REFERENCES menu_items(id),
  purchase_price DECIMAL,
  quantity INTEGER
);
