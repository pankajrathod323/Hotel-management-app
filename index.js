const express = require("express");
//import cookieParser from "cookie-parser";
const session = require("express-session");
const app = express();

const sessionOptoins =  {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
   }

app.use(session(sessionOptoins));

app.get("/register", (req, res)=> {
   let {name} = req.query;
   console.log(req.session);
   req.session.name = name;
   console.log(req.session);
   res.send("Register page");
});

app.get("/hello" , (req, res) => {
   console.log(req.session);
   res.send(`Hello ${req.session.name}`);
});








// app.get("/reqcount", (req, res) => {
//   req.session.count = req.session.count ? req.session.count + 1 : 1;
//   res.send(`You sent a request ${req.session.count} times`);
// })

// app.get("/test", (req, res) => {
//      res.send("Test is working");
// })






// // middleware to parse cookies
// app.use(cookieParser("secret"));

// // STEP 1: Set cookie
// app.get("/login", (req, res) => {
//   res.cookie("user", "Bruce", {
//     signed: true,
//     maxAge: 1000 * 60 * 60, // 1 hour
//     httpOnly: true
//   });

//   res.send("User logged in, cookie set");
// });

// // STEP 2: Read cookie
// app.get("/profile", (req, res) => {
//   const user = req.cookies.user;
//   console.log(user);
//   if (!user) {
//     return res.send("Not logged in");
//   }

//   res.send(`Welcome ${user}`);
// });

// // STEP 3: Clear cookie
// app.get("/logout", (req, res) => {
//   res.clearCookie("user");
//   res.send("Logged out, cookie cleared");
// });

app.listen(3000, () => {
  console.log("Server running on port 3000");
});