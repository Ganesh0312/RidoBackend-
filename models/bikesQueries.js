const bikesQueries = {
  insertBike:
    "INSERT INTO bikes (user_id, bike_model, bike_registration, purchase_date, initial_km, color) VALUES(?,?,?,?,?,?)",
  getAllBikesData: "SELECT * FROM bikes",
  getBikeById: "SELECT * FROM bikes WHERE bike_id = ?",
  getBikeByUserId: "SELECT * FROM bikes WHERE user_id = ?",
};

module.exports = bikesQueries;
