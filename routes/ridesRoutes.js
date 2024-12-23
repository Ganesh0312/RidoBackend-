const express = require("express");
const router = express.Router();
const { authenticationToken } = require("../middlewares/authMiddleware");
const {
  addRide,
  getAllRides,
  getRideById,
  updateRide,
  startRide,
  endRide,
} = require("../controllers/ridesController");

// router.post("/add", authenticationToken, addRide);
// router.get("/all", authenticateToken, getAllRides);
// router.get("/:rideId", authenticateToken, getRideById);
// router.put("/:rideId", authenticateToken, updateRide);

router.post("/add", addRide);
router.get("/getall", getAllRides);
router.get("/getbyid/:rideId", getRideById);
router.put("/update/:rideId", updateRide);
router.post("/startride", startRide);
router.post("/endride", endRide);
module.exports = router;
