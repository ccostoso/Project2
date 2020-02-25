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

      res.render("index", hbsObject);

      console.log(data);
    });
});

router.get("/:clause_title", function (req, res) {

  db.Clause.findOne({
    where: {
      clause_title: req.params.clause_title
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

// router.post("/api/clause", function (req, res) {
//   console.log("req.body", req.body);

//   db.Clause.create({
//     clause_url: req.body.clause_url,
//     clause_title: req.body.clause_title,
//     clause_requires: req.body.clause_requires
//   }).then(function () {
//     res.send(204).end();
//   });
// });

// =====================================================
// Control Panel Routes
// =====================================================

router.get("/api/control-panel", function(req, res) {
  db.Clause.findAll()
  .then(function (data) {
    var hbsObject = {
      clause: data
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
module.exports = router;
