USE pharmasoft;
SHOW TABLES;

DESCRIBE product;
DESCRIBE pharmacy;

-- INSERT INTO pharmacy(name, email, pharmacycode) VALUES("laudk", "laudk@gmail.com", "1234");
SELECT * FROM pharmacy;

-- INSERT INTO product(name, price, image, pharmacy_id) VALUES("Paracetamol", 2, "default.png", 4);
-- INSERT INTO product(name, price, image, pharmacy_id) VALUES("Lonart", 50, "default.png", 4);
-- INSERT INTO product(name, price, image, pharmacy_id) VALUES("Antibiotic", 70, "default.png", 4);

SELECT * FROM product;
