DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100)NOT NULL,
  department_name VARCHAR(100)NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bluetooth Speaker", "Electronics", 35.50, 6), ("Bag of Rare Coins", "Collectibles", 22.00, 10), ("Sunglasses", "Apparel", 15, 25), ("Mazda RX-8 Performance Throttle Bodies", "Automotive", 560, 4), ("Henckels 10-inch Chef's Knife", "Household Goods", 125.00, 34), ("Assorted Cigars", "Luxury Goods", 35.00, 8), ("Dr. Seuss Box Set", "Books", 20.00, 12), ("Scented Bath Soaps", "Household Goods", 9.75, 18), ("Electric Switch Propane Blowtorch", "Tools", 32.00, 13), ("AA Batteries", "Household Goods", 8.90, 28)

