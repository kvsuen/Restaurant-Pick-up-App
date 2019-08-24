-- Drop and recreate orders Table

DROP TABLE IF EXISTS orders CASCADE;
CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  order_time TIMESTAMP,
  credit_card_number BIGINT,
  card_expiry_date SMALLINT,
  card_security_code SMALLINT
);
