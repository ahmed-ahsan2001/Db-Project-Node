// const express = require("express");
// const session = require("express-session");
// const cookie = require("cookie-parser");
// const path = require("path");
// const ejs = require("ejs");
// var flash = require("express-flash");
// const multer = require("multer");
// const async = require("async");
// const nodemailer = require("nodemailer");
// const crypto = require("crypto");
// const expressValidator = require("express-validator");
// const sweetalert = require("sweetalert2");
// const bodyParser = require("body-parser");
// const http = require("http");
// const { Server } = require("https");
// const db = require("./models/database");
// var app = express();
// const cors = require("cors");

// app.use(cors());
// //app.use(morgan("dev")); // it will log all the requests.
// app.use(bodyParser.urlencoded({ extended: false })); // it will handle request body
// app.use(bodyParser.json()); // it will handle request body
// app.use(cookieParser());
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.header("Access-Control-Allow-Origin", req.headers.origin);
//   res.header("Access-Control-Allow-Credentials", true);

//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,PATCH");
//     return res.status(200).json({});
//   }
//   next();
// });

// const staticPath = path.join(path.join(__dirname, "/views"));
// app.use(express.static(staticPath));
// app.use("/", function (req, res, next) {
//   x;
//   res.render("index.html");
// });

// app.get("/search", (req, res) => {
//   console.log("search");
//   res.render("search");
// });

// // app.post("/bawany", (req, res) => {
// //   console.log(req.body);
// // });

// // module.exports = app;
// // // const server = http.createServer(app);
// // // app.set("view engine", "ejs");
// // // app.use(express.static("./views"));
// // // app.get("/", function (req, res, next) {
// // //   res.render("index.html", { title: "User Form" });
// // // });

// // // app.post("/user_form", function (req, res, next) {
// // //   var name = req.body.name;
// // //   var email = req.body.email;
// // //   var password = req.body.password;
// // //   var sql = `INSERT INTO users (name, email, password, created_at) VALUES ("${name}", "${email}", "${password}", NOW())`;
// // //   db.query(sql, function (err, result) {
// // //     if (err) throw err;
// // //     console.log("Row has been updated");
// // //     req.flash("success", "Data stored!");
// // //     res.redirect("/");
// // //   });
// // // });

// // // app.use(function (req, res, next) {
// // //   next(createError(404));
// // // });
// // // app.use(function (err, req, res, next) {
// // //   res.locals.message = err.message;
// // //   res.locals.error = req.app.get("env") === "development" ? err : {};
// // //   res.status(err.status || 500);
// // //   res.render("error");
// // // });

// // // app.use(bodyparser.urlencoded({ extended: true }));
// // // app.use(bodyparser.json());
// // // app.use(cookie());
// // // const PORT = process.env.PORT || 3000;
// // // server.listen(PORT, () => console.log(`server running on port ${PORT}`));
const con = require("./models/database");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const popup = require("node-popup");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("views"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/", function (req, res) {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  let cpassword = req.body.cpassword;

  con.connect(function (error) {
    // if (error) {
    //   throw error;
    // }

    let sql = "INSERT INTO users (name, email, password) VALUES ?";
    // ('" +
    // name +
    // "','" +
    // email +
    // "','" +
    // password +
    // "')";
    let values = [[name, email, password]];
    con.query(sql, [values], function (error, result) {
      if (error) throw error;
      res.redirect("back");
    });
  });
});
// popup.alert({
//   content: "Successfully Signed In",
// });
app.listen(8000);
