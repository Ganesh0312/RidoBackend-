const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const multer = require("multer");
const db = require("../configs/database");
const userQuery = require("../models/userQueries");

// exports.register = async (req, res) => {
//   const { username, email, password, phone_number, profile_picture } = req.body;

//   // Check for missing fields
//   if (!username || !email || !password || !phone_number || !profile_picture) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const userId = await db.execute(userQuery.insertUser, [
//       username,
//       email,
//       hashedPassword,
//       phone_number,
//       profile_picture,
//     ]);
//     console.log("User data to insert:", {
//       username,
//       email,
//       password: hashedPassword,
//       phone_number,
//       profile_picture,
//     });
//     res.status(201).json({ message: "User registered successfully", userId });
//   } catch (error) {
//     console.log("Error registering user: ", error.message);
//     res.status(400).json({ error: "User registration failed" });
//   }
// };

//Configure multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory as Buffer objects
const upload = multer({ storage: storage });

exports.register = async (req, res) => {
  upload.single("profile_picture")(req, res, async (err) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Failed to upload profile picture" });
    }

    const { username, email, password, phone_number } = req.body;
    const profile_picture = req.file
      ? req.file.buffer.toString("base64")
      : null;

    // Check for missing fields
    if (!username || !email || !password || !phone_number || !profile_picture) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Debugging logs
    console.log("Registering user with the following details:");
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password (hashed):", password);
    console.log("Phone Number:", phone_number);
    console.log(
      "Profile Picture:",
      profile_picture ? "Uploaded" : "Not Uploaded"
    );

    try {
      // Check if user already exists
      const existingUser = await db.execute(userQuery.findUserByEmail, email);
      if (existingUser.length > 0) {
        return res
          .status(409)
          .json({ error: "User with this email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user into the database
      const userId = await db.execute(userQuery.insertUser, [
        username,
        email,
        hashedPassword,
        phone_number,
        profile_picture,
      ]);

      res.status(201).json({
        message: "User registered successfully",
        userId,
      });
    } catch (error) {
      console.error("Error registering user: ", error.message);
      res.status(500).json({ error: "User registration failed" });
    }
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const [user] = await db.execute(userQuery.findUserByEmail, [email]);
    if (!user) {
      return res.status(400).json({ error: "Invalid Email or password" });
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(400).json({ error: "Invalid Email and Password" });
    }
    const token = jwt.sign(
      { userId: user.user_id, name: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1y",
      }
    );
    res.status(200).json({
      message: "Login Successful",
      userId: user.user_id,
      userName: user.username,
      userEmail: user.email,
      token,
    });
  } catch (error) {
    console.error("Error During Login", error.message);
    res.status(400).json({ error: "Login Failed due to server error" });
  }
};
