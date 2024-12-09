const express = require("express");
const router = express.Router();
const { authenticationToken } = require("../middlewares/authMiddleware");
const {
  addRide,
  getAllRides,
  getRideById,
  updateRide,
} = require("../controllers/ridesController");

// router.post("/add", authenticationToken, addRide);
// router.get("/all", authenticateToken, getAllRides);
// router.get("/:rideId", authenticateToken, getRideById);
// router.put("/:rideId", authenticateToken, updateRide);

router.post("/add", addRide);
router.get("/getall", getAllRides);
router.get("/getbyid/:rideId", getRideById);
router.put("/update/:rideId", updateRide);
module.exports = router;
