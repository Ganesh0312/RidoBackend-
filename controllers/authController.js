const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const db = require("../configs/database");
const userQuery = require("../models/userQueries");
require("dotenv").config();

// Multer setup for in-memory storage
const storage = multer.memoryStorage(); // Store image in memory, not disk
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only images are allowed"), false);
    }
  },
});

exports.register = async (req, res) => {
  upload.single("profile_picture")(req, res, async (err) => {
    if (err) {
      console.error("File upload error:", err.message);
      return res
        .status(500)
        .json({ error: `Failed to upload profile picture: ${err.message}` });
    }

    const { username, email, password, phone_number } = req.body;
    const profile_picture = req.file
      ? req.file.buffer.toString("base64") // Convert buffer to Base64
      : null;

    if (!username || !email || !password || !phone_number || !profile_picture) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      // Check if user exists
      const [existingUser] = await db.execute(userQuery.findUserByEmail, [
        email,
      ]);
      if (existingUser) {
        return res.status(409).json({
          error: `User with this email (${email}) already exists`,
        });
      }

      // Hash password
      const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      // Insert into database
      const result = await db.execute(userQuery.insertUser, [
        username,
        email,
        hashedPassword,
        phone_number,
        profile_picture,
      ]);

      res.status(201).json({
        message: "User registered successfully",
        userId: result.insertId, // Adjust if the result format is different
      });
    } catch (error) {
      console.error(
        "Error registering user: ",
        error.stack || error.message || error
      );
      res
        .status(500)
        .json({ error: "User registration failed", details: error.message });
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
      return res.status(400).json({ error: "Invalid Email" });
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

exports.getUserByEmail = async (req, res) => {
  const { useremail } = req.params;

  try {
    if (!useremail) {
      return res.status(400).json({ error: "Email is required" });
    }

    const [user] = await db.execute(userQuery.findUserByEmail, [useremail]);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { user_id, username, email, phone_number, profile_picture } = user;

    const userWithoutPassword = {
      user_id,
      username,
      email,
      phone_number,
      profile_picture: profile_picture
        ? `data:image/jpeg;base64,${profile_picture}` // Format Base64 string for use in React Native
        : null,
    };

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error("Error while getting user:", error.message);
    res.status(500).json({ error: "Error while retrieving user" });
  }
};
