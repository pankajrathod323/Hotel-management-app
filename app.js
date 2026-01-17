const express = require("express");
const mongoose = require("mongoose");
const port = 8080;
const app = express();
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
  console.log("successfully connected to database");
}).catch((err) => {
  console.log(err);
});


async function main() {
  await mongoose.connect(MONGO_URL);
}




app.get("/", (req, res) => {
  res.send("hi i'am root");
})
app.listen(port, () => {
  console.log("app is litening on port", port);
})
