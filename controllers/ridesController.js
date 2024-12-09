const { validateRideInput } = require("../validators/rideValidators");
const db = require("../configs/database");
const ridesQueries = require("../models/ridesQueries");
exports.addRide = async (req, res) => {
  const {
    user_id,
    bike_id,
    ride_date,
    day_of_week,
    ride_type,
    ride_day_count,
    start_time,
    start_km,
    start_avg_mileage,
    start_dte,
    start_add,
    end_add,
    via_stops,
    end_time,
    end_km,
    end_avg_mileage,
    end_dte,
    fuel_used,
    balance_petrol,
    dte_status,
    commutation_type,
    comm_time,
    drive_mode,
    drive_type,
    remarks,
  } = req.body;

  // Validate user input
  const validationErrors = validateRideInput(req.body);
  if (validationErrors.length > 0) {
    return res
      .status(400)
      .json({ error: "Validation failed", details: validationErrors });
  }

  try {
    const rideId = await db.execute(ridesQueries.addRide, [
      user_id,
      bike_id,
      ride_date,
      day_of_week,
      ride_type,
      ride_day_count,
      start_time,
      start_km,
      start_avg_mileage,
      start_dte,
      start_add,
      end_add,
      via_stops,
      end_time,
      end_km,
      end_avg_mileage,
      end_dte,
      fuel_used,
      balance_petrol,
      dte_status,
      commutation_type,
      comm_time,
      drive_mode,
      drive_type,
      remarks,
    ]);
    res.status(201).json({ message: "Ride added successfully", rideId });
  } catch (error) {
    console.error("Error adding ride:", error.message);
    res.status(500).json({ error: "Failed to add ride" });
  }
};

exports.getAllRides = async (req, res) => {
  try {
    const rides = await db.execute(ridesQueries.getAllRides);
    if (!rides) {
      return res.status(404).json({ message: "No rides Found" });
    }
    res.status(200).json(rides);
  } catch (error) {
    console.error("Error Rettriving Rides ", error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

exports.getRideById = async (req, res) => {
  const { rideId } = req.params;

  if (isNaN(rideId)) {
    return res.status(400).json({ error: "Invalid ride ID" });
  }

  try {
    const ride = await db.execute(ridesQueries.getRideById, rideId);
    if (!ride || ride.length === 0) {
      return res.status(404).json({ error: "Ride not found" });
    }
    res.status(200).json(ride);
  } catch (error) {
    console.error("Error fetching ride:", error.message);
    res.status(500).json({ error: "Failed to fetch ride" });
  }
};

exports.updateRide = async (req, res) => {
  const { rideId } = req.params;
  const validationErrors = validateRideInput(req.body);
  if (validationErrors.length > 0) {
    return res
      .status(400)
      .json({ error: "Validation failed", details: validationErrors });
  }

  if (isNaN(rideId)) {
    return res.status(400).json({ error: "Invalid ride ID" });
  }

  try {
    const result = await db.execute(ridesQueries.updateRide, [
      req.body.user_id,
      req.body.bike_id,
      req.body.ride_date,
      req.body.day_of_week,
      req.body.ride_type,
      req.body.ride_day_count,
      req.body.start_time,
      req.body.start_km,
      req.body.start_avg_mileage,
      req.body.start_dte,
      req.body.start_add,
      req.body.end_add,
      req.body.via_stops,
      req.body.end_time,
      req.body.end_km,
      req.body.end_avg_mileage,
      req.body.end_dte,
      req.body.fuel_used,
      req.body.balance_petrol,
      req.body.dte_status,
      req.body.commutation_type,
      req.body.comm_time,
      req.body.drive_mode,
      req.body.drive_type,
      req.body.remarks,
      rideId,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Ride not found" });
    }

    res.status(200).json({ message: "Ride updated successfully" });
  } catch (error) {
    console.error("Error updating ride:", error.message);
    res.status(500).json({ error: "Failed to update ride" });
  }
};
