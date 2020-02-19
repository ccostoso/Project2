var express = require("express");

var PORT = process.env.PORT || 8080;

var app = express();

var dictionary = {"water": "111", "dirt": "222"};

app.get("/def/:word", function(req,res){
    res.send(dictionary[req.params.word]);
})

app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });
