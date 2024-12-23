const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const database = require("./configs/database");

app.use(express.json());

const authUsers = require("./routes/authRoutes");
const bikesRoutes = require("./routes/bikesRoutes");
const ridesRoutes = require("./routes/ridesRoutes");
app.use("/api/user", authUsers);
app.use("/api/bikes", bikesRoutes);
app.use("/api/rides", ridesRoutes);

app.use(
  "/images",
  express.static(path.join(__dirname, "profile_images_uploded"))
);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  try {
    console.log(`Server is running on port address ${port}`);
  } catch (error) {
    console.log(error);
  }
});
