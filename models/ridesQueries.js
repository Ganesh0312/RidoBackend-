const ridesQueries = {
  addRide: `
      INSERT INTO rides (
        user_id, bike_id, ride_date, day_of_week, ride_type, ride_day_count,
        start_time, start_km, start_avg_mileage, start_dte, start_add, end_add, via_stops,
        end_time, end_km, end_avg_mileage, end_dte, fuel_used, balance_petrol,
        dte_status, commutation_type, comm_time, drive_mode, drive_type, remarks
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  getAllRides: `SELECT * FROM rides`,
  getRideById: `SELECT * FROM rides WHERE ride_id=?`,
  updateRide: `UPDATE rides
      SET 
        user_id = ?, bike_id = ?, ride_date = ?, day_of_week = ?, ride_type = ?, ride_day_count = ?,
        start_time = ?, start_km = ?, start_avg_mileage = ?, start_dte = ?, start_add = ?, end_add = ?, via_stops = ?,
        end_time = ?, end_km = ?, end_avg_mileage = ?, end_dte = ?, fuel_used = ?, balance_petrol = ?, 
        dte_status = ?, commutation_type = ?, comm_time = ?, drive_mode = ?, drive_type = ?, remarks = ?
      WHERE ride_id = ?`,
  deleteRide: "DELETE FROM rides WHERE ride_id=?",
  startRide: `
  INSERT INTO rides (
    user_id, bike_id, ride_date, day_of_week, start_time, start_km,
    start_avg_mileage, start_dte, start_add
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  endRide: `
  UPDATE rides
  SET 
    end_time = ?, end_km = ?, end_avg_mileage = ?, end_dte = ?, end_add = ?,
    fuel_used = ?, balance_petrol = ?, dte_status = ?, via_stops = ?,
    commutation_type = ?, comm_time = ?, drive_mode = ?, drive_type = ?, remarks = ?
  WHERE ride_id = ?`,
};

module.exports = ridesQueries;
