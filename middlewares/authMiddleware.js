// const jw = require("jsonwebtoken");

// exports.authenticationToken = (req, res, next) => {
//   const token = req.headers["authorization"];

//   if (!token) {
//     return res.status(401).json({ error: "Access Denied" });
//   }

//   try {
//     const decoded = jwt.verify(token.split("")[1], process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(403).json({ error: "Invalid User. Access Denied" });
//   }
// };

const jwt = require("jsonwebtoken");

exports.authenticationToken = (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.headers["authorization"];

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ error: "Access Denied" });
  }

  // Split the token from the 'Bearer <token>' format
  const tokenValue = token.split(" ")[1];

  // If there is no token part after 'Bearer'
  if (!tokenValue) {
    return res.status(401).json({ error: "Access Denied" });
  }

  try {
    // Verify the token using the secret
    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);

    // Attach the decoded user information to the request
    req.user = decoded;
    next();
  } catch (error) {
    // If the token is invalid
    return res.status(403).json({ error: "Invalid User. Access Denied" });
  }
};

// exports.authenticationRoles = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res
//         .status(403)
//         .json({ error: "Access Denied. Insufficient Permissions." });
//     }
//     next();
//   };
// };
