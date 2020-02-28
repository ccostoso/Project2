var express = require("express");
var path = require("path");
var cookieParser = require('cookie-parser'); // module for parsing cookies


var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our Clause model
var db = require("./models");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static('public'));
//use cookie for log in.
app.use(cookieParser());

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/clause_controller.js");

app.use(routes);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
});