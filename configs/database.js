const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test the database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Database connected successfully!");
    connection.release(); // Release the connection back to the pool
  } catch (error) {
    console.error("Database connection failed:", error.message);
    throw new Error(
      "Unable to connect to the database. Please check your configuration."
    );
  }
};

// Function to execute queries
const execute = async (query, params) => {
  try {
    const [results] = await pool.query(query, params);
    return results;
  } catch (error) {
    console.error("Database query error:", error.message);

    // Throw a custom error for known issues
    if (error.code === "ER_DUP_ENTRY") {
      throw new Error("Duplicate entry found. Please check your data.");
    }
    if (error.code === "ER_BAD_FIELD_ERROR") {
      throw new Error("Invalid field name in the query.");
    }

    // Default error handling
    throw new Error("An unexpected database error occurred.");
  }
};

// Call testConnection on initialization
testConnection();

module.exports = {
  pool,
  execute,
};
