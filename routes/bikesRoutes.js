const express = require("express");
const {
  addBike,
  getAllBikes,
  getBikeById,
  getBikeByUserId,
} = require("../controllers/bikesController");
const { authenticationToken } = require("../middlewares/authMiddleware");
const router = express.Router();

// router.post("/add", authenticationToken, addBike);
// router.get("/getall", authenticationToken, getAllBikes);
// router.get("/get/:bikeId", authenticationToken, getBikesById);

router.post("/add", addBike);
router.get("/getall", getAllBikes);
router.get("/get/:bikeId", getBikeById);
router.get("/getbyuserid/:userId", getBikeByUserId);


module.exports = router;
