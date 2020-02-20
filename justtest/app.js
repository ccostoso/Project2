function regex(string) {
    // Make string "url"-safe
    // If the string is "à condition que" it will change it into "a-condition-que"
    // If the string is s'asseoir it will turn it into s_asseoir
    // It will turns spaces in to dashes
    // It will turn accented characters into non-accented characters
    // It will change ' into _
}
module.exports = regex;


var express = require('express');
var changeDash = require('../models/something.js');

var regex = express.Router();

regex.get("/", function(req, res){
    changeDash.selectAll(function(new_word){
           
    });    
});

router.post("/new_word", function(req, res){
    changeDash.whatIsName(req.body.???.replace(" ","_"), function(result){
        console.log(result);
        res.redirect("/");
    });
});


module.exports = router;