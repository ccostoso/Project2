const express = require('express');
var router = express.Router();

// Requiring our Todo model
var db = require("../models");

router.get("/", function (req, res) {
  db.Clause.findAll()
    .then(function (data) {
      var hbsObject = {
        clause: data
      }

      res.render("index", {header: 'Learning Language'});

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

router.post("/clause", function (req, res) {
  console.log("req.body", req.body);

  db.Clause.create({
    clause_url: req.body.clause_url,
    clause_title: req.body.clause_title,
    clause_requires: req.body.clause_requires
  }).then(function () {
    res.send(204).end();
  });
});

//----------------------------------------------------------------------------------------------

router.get("/book", function (req, res) {
  res.render("book", {header: 'Learning Language'});//핸들바 불러옴
});

router.get("/book/:bookTitle", function (req, res) {
  console.log(req.params.bookTitle)
  db.Book.findOne({
    where: {
      book_name: req.params.bookTitle.replace(/_/g, " ")
    }
  })
    .then(function (data) {
      console.log('working2');

      var bookObject = {
        find_book: data ? (data.dataValues ? data.dataValues : null) : null
      };

      res.render("book_result", bookObject);
      console.log(data);
    });
});

router.post("/book", function (req, res) {
  console.log("req.body", req.body);

  db.Book.create({
    book_name: req.body.book_name,
    url: req.body.book_url,
    img_url: req.body.img_url,
    book_desc: req.body.book_desc
  }).then(function () {
    res.send(204).end();
  });
});

//-------------------------------------------------------

router.get("/about", function(req,res){
  res.render("about", {header: 'Learning Language'});
});

router.get("/team", function(req,res){
  res.render("team", {header: 'Team Members'})
})



module.exports = router;
