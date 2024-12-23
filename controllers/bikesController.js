const db = require("../configs/database");
const bikesQueries = require("../models/bikesQueries");

exports.addBike = async (req, res) => {
  const {
    user_id,
    bike_model,
    bike_registration,
    purchase_date,
    initial_km,
    color,
  } = req.body;

  if (
    !user_id ||
    !bike_model ||
    !bike_registration ||
    !purchase_date ||
    !initial_km ||
    !color
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const bikesId = await db.execute(bikesQueries.insertBike, [
      user_id,
      bike_model,
      bike_registration,
      purchase_date,
      initial_km,
      color,
    ]);
    res
      .status(201)
      .json({ message: "Bike Added Successfully", bikeId: bikesId.insertId });
  } catch (error) {
    console.error("Error adding bike: ", error.message);
    res.status(500).json({ error: "Failed to add bikes" });
  }
};

exports.getAllBikes = async (req, res) => {
  try {
    const bikes = await db.execute(bikesQueries.getAllBikesData);
    if (!bikes) {
      return res.status(404).json({ error: "Bike not Found" });
    }
    res.status(200).json(bikes);
  } catch (error) {
    console.log("Error retrieving bike: ", error.message);
    res.status(500).json({ error: "Failed to retrive Bike" });
  }
};

exports.getBikeById = async (req, res) => {
  const { bikeId } = req.params;
  try {
    const [bike] = await db.execute(bikesQueries.getBikeById, [bikeId]); // Use array for parameter
    if (!bike || bike.length === 0) {
      return res.status(404).json({ error: "Bike not found" });
    }

    // Return the first bike object
    res.status(200).json(bike);
  } catch (error) {
    console.error("Error retrieving bike:", error.message);
    res.status(500).json({ error: "Failed to retrieve bike" });
  }
};
exports.getBikeByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const [bike] = await db.execute(bikesQueries.getBikeByUserId, userId); // Use array for parameter
    if (!bike || bike.length === 0) {
      return res.status(404).json({ error: "Bike not found" });
    }
    // Return the first bike object
    res.status(200).json(bike);
  } catch (error) {
    console.error("Error retrieving bike:", error.message);
    res.status(500).json({ error: "Failed to retrieve bike" });
  }
};
