-- Drop menu_items table (Remove on deploy)

DROP TABLE IF EXISTS menu_items CASCADE;

-- Create menu_items table

CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY NOT NULL,
  item VARCHAR(255),
  description TEXT,
  price INTEGER,
  type VARCHAR(255)
);
