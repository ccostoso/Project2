USE subj_hbs_db;

DROP TABLE IF EXISTS Books;
CREATE TABLE Books(
id INT AUTO_INCREMENT NOT NULL,
book_name VARCHAR(300) NOT NULL,
url VARCHAR(1000) NOT NULL,
img_url VARCHAR(1000) NOT NULL,
book_desc VARCHAR(1000) NOT NULL, 
createdAt DATE,
updatedAt DATE,
primary key(id)
);

INSERT INTO Books(book_name, url, img_url, book_desc)
VALUES ("Fluent in French", "https://www.amazon.com/Fluent-French-complete-study-guide/dp/1515000141","https://images-na.ssl-images-amazon.com/images/I/515p9JAcpTL._SX331_BO1,204,203,200_.jpg", "The Ultimate French Language Study Guide."),
	   ("Easy French Step by Step", "https://www.amazon.com/French-Step-Step-Myrna-Rochester/dp/0071453873/ref=sr_1_2?keywords=french&qid=1582574497&sr=8-2","https://images-na.ssl-images-amazon.com/images/I/516E6Cmk3LL._SX399_BO1,204,203,200_.jpg","Easy French Step by Step proves that a solid grounding in grammar basics is the key to mastering a second language.");