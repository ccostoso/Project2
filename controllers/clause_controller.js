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

router.get("/:clause_title", function (req, res) {

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
module.exports = router;
