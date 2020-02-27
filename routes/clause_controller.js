const express = require('express');
var router = express.Router();

// Requiring our Todo model
var db = require("../models");

// Create all our routes and set up logic within those routes where required.
// router.get("/", function (req, res) {
//     db.Clause.findAll()
//         .then(function(data) {
//             var hbsObject = {
//                 clauses: data
//             }

//             res.render("index", hbsObject);

//             console.log(data);
//     });
// });

router.get("/", function (req, res) {
  db.Clause.findAll()
    .then(function (data) {
      var hbsObject = {
        clause: data
      }

      res.render("index");

      console.log(data);
    });
});

router.get("/clause/:clause_title", function (req, res) {

  db.Clause.findOne({
    where: {
      clause_url: req.params.clause_title
    }
  })
    .then(function (data) {
      console.log('working??');

      var hbsObject = {
        clause: data
      }

      res.render("results", hbsObject);

      console.log(hbsObject);
    });
});

router.post("/api/clause", function (req, res) {
  console.log("req.body", req.body);

  db.Clause.create({
    clause_url: req.body.clause_url,
    clause_title: req.body.clause_title,
    clause_requires: req.body.clause_requires
  }).then(function () {
    res.send(204).end();
  });
});

// router.put("/api/burger/:id", function (req, res) {
//     console.log("req.body", req.body);
//     console.log("req.params", req.params);

//     db.Burger.update({
//         devoured: req.body.devoured,
//       }, {
//         where: {
//           id: req.params.id
//         }
//       }).then(function() {
//         res.send(204).end();
//       })
// });

// router.delete("/api/burger/:id", function (req, res) {
//     console.log("req.params", req.params);

//     db.Burger.destroy({
//         where: {
//           id: req.params.id
//         }
//       }).then(function() {
//         res.send(204).end();
//       })
// });

// Export routes for server.js to use.


router.get("/book", function (req, res) {
  res.render("book");//핸들바 불러옴
});

router.get("/book/:bookTitle", function (req, res) {
  console.log(req.params.bookTitle)//bookTitle안에는 스페이스가 언더스코어로 바꿔져있는 결과가 출력된다. 
  db.Book.findOne({
    where: {
      book_name: req.params.bookTitle.replace(/_/g, " ")
      //bookTitle이 url의 param이어서 app.js에서 스페이스를 언더스코어로 바꿔줬지만 
      //실제 책 이름은 검색할때 다시 언더스코어를 스페이스로 바꿔줘야해서 반대로 리플레이스를 작성
    }
  })
    .then(function (data) {
      console.log('working2');

      var bookObject = {
        find_book: data ? (data.dataValues ? data.dataValues : null) : null
        //data와 data.dataValues가 존재하면 find_book에 data.dataValues를 넣고 아니면 null  
        //find_book: data.dataValues 
      };

      res.render("book_result", bookObject);

      console.log(bookObject);
    });
});

router.post("/book", function (req, res) {
  console.log("req.body", req.body);

  db.Book.create({
    book_name: req.body.book_name,
    book_requires: req.body.price
  }).then(function () {
    res.send(204).end();
  });
});

module.exports = router;
