const express = require("express");
const {
  addBike,
  getAllBikes,
  getBikeById,
} = require("../controllers/bikesController");
const { authenticationToken } = require("../middlewares/authMiddleware");
const router = express.Router();

// router.post("/add", authenticationToken, addBike);
// router.get("/getall", authenticationToken, getAllBikes);
// router.get("/get/:bikeId", authenticationToken, getBikesById);

router.post("/add", addBike);
router.get("/getall", getAllBikes);
router.get("/get/:bikeId", getBikeById);

module.exports = router;
