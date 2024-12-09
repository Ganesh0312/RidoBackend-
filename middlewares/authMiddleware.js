const jw = require("jsonwebtoken");

exports.authenticationToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "Access Denied" });
  }

  try {
    const decoded = jwt.verify(token.split("")[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
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
