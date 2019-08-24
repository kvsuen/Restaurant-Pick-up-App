-- Drop and recreate menu_items table

DROP TABLE IF EXISTS menu_items CASCADE;
CREATE TABLE menu_items (
  item VARCHAR(255) NOT NULL,
  picture VARCHAR(255),
  price INTEGER,
  description, VARCHAR(255)
);
