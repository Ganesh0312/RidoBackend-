const userQueries = {
  insertUser:
    "INSERT INTO users (username, email, password, phone_number, profile_picture) VALUES (?, ?, ?, ?, ?)",
  findUserByEmail: "SELECT * FROM users WHERE email = ?",
  findUserById: "SELECT * FROM users WHERE id=?",
};

module.exports = userQueries;
