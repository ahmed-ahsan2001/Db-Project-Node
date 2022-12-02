const con = require("./models/database");
var path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const popup = require("node-popup");
var userRoute = require("./Api/user");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const session = require("express-session");
app.use(
  session({
    secret: "webslesson",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.static("views"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/", function (req, res) {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  con.query(
    'SELECT email FROM users WHERE email ="' + email + '"',
    (err, result) => {
      if (err) throw err;
      console.log(result);
      if (result.length > 0) {
        res.send("user already registered \n Please Enter a different email");
      } else {
        let sql = "INSERT INTO users (name, email, password) VALUES ?";
        let values = [[name, email, password]];
        con.query(sql, [values], function (error, result) {
          if (error) throw err;
          res.redirect("back");
        });
      }
    }
  );
});

app.get("/user", function (req, res, next) {
  con.query("select * from users", function (err, rows) {
    if (err) {
      req.flash("error", err);
      res.render("profile", { data: "" });
    } else {
      res.render("profile", { data: rows });
    }
  });
});

app.post("/auth1", function (request, response) {
  // Capture the input fields
  let user_name = request.body.user_name;
  let password = request.body.password;
  // Ensure the input fields exists and are not empty
  if (user_name && password) {
    // Execute SQL query that'll select the account from the database based on the specified username and password
    con.query(
      "SELECT * FROM admin WHERE user_name = ? AND password = ?",
      [user_name, password],
      function (error, results, fields) {
        // If there is an issue with the query, output the error
        if (error) throw error;
        // If the account exists
        if (results.length > 0) {
          // Authenticate the user
          request.session.loggedin = true;
          request.session.user_name = user_name;
          // Redirect to home page
          response.redirect("/admin");
        } else {
          response.send("Incorrect email and/or Password!");
        }
        response.end();
      }
    );
  } else {
    response.send("Please enter email and Password!");
    response.end();
  }
});

app.post("/auth", function (request, response) {
  // Capture the input fields
  let email = request.body.email;
  let password = request.body.password;
  // Ensure the input fields exists and are not empty
  if (email && password) {
    // Execute SQL query that'll select the account from the database based on the specified username and password
    con.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password],
      function (error, results, fields) {
        // If there is an issue with the query, output the error
        if (error) throw error;
        // If the account exists
        if (results.length > 0) {
          // Authenticate the user
          request.session.loggedin = true;
          request.session.email = email;
          // Redirect to home page
          response.redirect("/home");
        } else {
          response.send("Incorrect email and/or Password!");
        }
        response.end();
      }
    );
  } else {
    response.send("Please enter email and Password!");
    response.end();
  }
});

app.get("/home", function (request, response) {
  // If the user is loggedin
  if (request.session.loggedin) {
    // Output username
    response.redirect("/user");
  } else {
    // Not logged in
    response.send("Please login to view this page!");
  }
  response.end();
});
app.get("/admin", function (req, res) {
  con.query("select * from users", function (err, rows) {
    if (err) {
      req.flash("error", err);
      res.render("admin", { data: "" });
    } else {
      res.render("admin", { data: rows });
    }
  });
});

// popup.alert({
//   content: "Successfully Signed In",
// });
app.listen(8000);

module.exports = app;
