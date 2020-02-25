USE subj_hbs_db;

DROP TABLE IF EXISTS Books;
CREATE TABLE Books(
id INT AUTO_INCREMENT NOT NULL,
book_name VARCHAR(300) NOT NULL,
price DECIMAL(6,2),
createdAt DATE,
updatedAt DATE,
primary key(id)
);

INSERT INTO Books(book_name, price)
VALUES ("EasyFranchStep by Step", 7.25),
	  ("French grammar", 6.47),
      ("abc",8.00);