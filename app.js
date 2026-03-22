const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");

// Models & Utils
const ExpressError = require("./utils/ExpressError.js");

// Configuration
const port = 8080;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({extended:true})); 
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);
// Database Connection
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
  console.log("successfully connected to database");
}).catch((err) => {
  console.log(err);
});

async function main() {
  await mongoose.connect(MONGO_URL);
}



// --- ERROR HANDLING ---

// 404 Route
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went Wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

app.listen(port, () => {
  console.log("app is litening on port", port);
})
