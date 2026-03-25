const mongoose = require("mongoose");
const Listing = require('../models/listing.js');
const {data} = require("./data.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
  console.log("successfully connected to database");
}).catch((err) => {
  console.log(err);
});

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () =>{
  await  Listing.deleteMany({});
  const updatedData = data.map((obj) => ({
    ...obj, 
    owner: "69c296c2a04ff5422090aef3"
  }));
  await Listing.insertMany(updatedData);
  console.log("data was saved successfully");
}

initDB();