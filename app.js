const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const port = 8080;
const app = express();
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({extended:true})); 

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
  console.log("successfully connected to database");
}).catch((err) => {
  console.log(err);
});

async function main() {
  await mongoose.connect(MONGO_URL);
}

// app.get("/testListing",async (req, res) =>{
//      let sampleListing = new Listing({
//       title: "My New Villa",
//       description: "By the beach",
//       price: 1200,
//       location: "Calangute, Goa",
//       country: "India",
//      })
//       await sampleListing.save();
//       console.log("sample was saved");
//      res.send("successful testing");
// })


app.get("/", (req, res) => {
  res.send("hi i'am root");
});

app.get("/listings", async (req, res) => {
  const allListings =  await Listing.find({});
  console.log(allListings);
  res.render("listings/index.ejs", { allListings });
});

app.get("/listings/:id", async (req, res) =>{
  let {id} = req.params;
  let listing = await Listing.findById(id);
  console.log(listing);
  res.render("listings/show.ejs", {listing});
})


app.listen(port, () => {
  console.log("app is litening on port", port);
})
