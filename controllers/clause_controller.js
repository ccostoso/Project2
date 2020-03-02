const express = require('express');
var router = express.Router();

// Requiring our Todo model
var db = require("../models");

router.get("/", function (req, res) {
  
  var isUser = req.cookies["user_type"] === "user";
  //스트링으로 작성을해도 연산자를 보고 불리언으로 리턴이 된다. 
  console.log("book" + isUser);

  db.Clause.findAll()
    .then(function (data) {
      var hbsObject = {
        clause: data
      }

      res.render("index", {header: 'Learning French'});

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

// =====================================================
// Control Panel Routes
// =====================================================

router.get("/api/control-panel", function(req, res) {
  db.Clause.findAll()
  .then(function (data) {
    var hbsObject = {
      clause: data,
      header: "Modify Clause"
    }

    res.render("control-panel", hbsObject);
    data.forEach(ele => {
      // console.log(ele.dataValues);
    })
    // console.log(hbsObject);
  });
}) 

router.put("/api/control-panel/:id", function (req, res) {
    console.log("req.body", req.body);
    console.log("req.params", req.params);

    db.Clause.update({
        clause_title: req.body.clause_title,
        clause_requires: req.body.clause_requires
      }, {
        where: {
          id: req.params.id
        }
      }).then(function() {
        res.send(204).end();
      })
});


router.delete("/api/control-panel/:id", function (req, res) {
    console.log("req.params", req.params);

    db.Clause.destroy({
        where: {
          id: req.params.id
        }
      }).then(function() {
        res.send(204).end();
      })
});

// Export routes for server.js to use.

router.get("/book", function (req, res) {
  var isUser = req.cookies["user_type"] === "user";
  //스트링으로 작성을해도 연산자를 보고 불리언으로 리턴이 된다. 
  console.log("book" + isUser);
  res.render("book", {header: isUser?'Search Book': 'New Book Data',isUser: isUser});//핸들바 불러옴
  //isUser앞부분 키, 뒤는 밸류로 베리어블 이름을 가지고온다. 
});

router.get("/book/:bookTitle", function (req, res) {
  console.log(req.params.bookTitle)
  db.Book.findOne({
    where: {
      book_name: req.params.bookTitle.replace(/_/g, " ").replace(/a/g, "à").replace(/e/g, "é").replace(/e/g, "ê").replace(/c/g, "ç").replace(/u/g, "ù")
    }
  })
    .then(function (data) {
      console.log('working2');

      var bookObject = {
        find_book: data ? (data.dataValues ? data.dataValues : null) : null,
        header: 'Book Information'
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

router.get("/book_main", function(req,res){
  res.render("book_main", {header: 'Books Page'});
});

router.get("/team", function(req,res){
  res.render("team", {header: 'Team Members'})
});

router.get("/book_main", function(req,res){
  res.render("book_main", {header: "Find Book"});
})

router.post("/book_main", function(req, res){
  if(req.body.user_type){
    res.cookie("user_type", req.body.user_type, { maxAge: 900000, httpOnly: true });
    //maxAge몇 초동안 이 쿠키가 살아있는지 표시
    //cookie key 이름 isUser
  }
  res.send(204);
});

router.get("/presentation", function(req, res){
  res.render("presentation");
});

module.exports = router;

// });