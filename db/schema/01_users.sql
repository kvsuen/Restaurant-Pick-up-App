-- Drop users table (remove on deploy)

DROP TABLE IF EXISTS users CASCADE;

-- Create users table

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  credit_card_number VARCHAR(255),
  card_expiry_date VARCHAR(255),
  card_security_code VARCHAR(255),
  phone_number VARCHAR(255) NOT NULL
);

