const express = require("express");
const router = express.Router();

const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");

// Index Route: List all listings
router.get("/", wrapAsync(listingController.index));

// New Route: Render form to create new listing
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Create Route: Add new listing to DB
router.post("/", isLoggedIn, validateListing, wrapAsync(listingController.createListing));

// Show Route: Display specific listing details
router.get("/:id", wrapAsync(listingController.showListing));

// Edit Route: Render form to edit listing
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

// Update Route: Update listing in DB
router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing));

//Delete Route
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyListing)
);
