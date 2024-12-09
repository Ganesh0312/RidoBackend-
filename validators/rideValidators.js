const validateRideInput = (data) => {
  const errors = [];

  // Required fields
  if (!data.user_id || isNaN(data.user_id))
    errors.push("Invalid or missing user_id");
  if (!data.bike_id || isNaN(data.bike_id))
    errors.push("Invalid or missing bike_id");
  if (!data.ride_date) errors.push("Ride date is required");
  if (!data.start_km || isNaN(data.start_km))
    errors.push("Invalid or missing start_km");
  if (!data.end_km || isNaN(data.end_km))
    errors.push("Invalid or missing end_km");

  // Additional validation for numeric fields
  if (data.start_km && data.end_km && data.end_km < data.start_km) {
    errors.push("End km should be greater than or equal to start km");
  }

  if (data.fuel_used && data.fuel_used < 0)
    errors.push("Fuel used must be a positive number");
  if (data.balance_petrol && data.balance_petrol < 0)
    errors.push("Balance petrol must be a positive number");

  return errors;
};

module.exports = { validateRideInput };
