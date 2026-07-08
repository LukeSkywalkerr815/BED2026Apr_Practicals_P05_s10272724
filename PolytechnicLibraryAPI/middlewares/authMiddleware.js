const jwt = require("jsonwebtoken");

function verifyJWT(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const authorizedRoles = {
      "GET /books": ["member", "librarian"],
      "PUT /books/[0-9]+/availability": ["librarian"], 
    };

    // Remove query parameters if any to strictly match endpoint
    const cleanUrl = req.url.split('?')[0];
    const requestedEndpoint = `${req.method} ${cleanUrl}`; 
    const userRole = decoded.role;

    const authorizedRole = Object.entries(authorizedRoles).find(
      ([endpoint, roles]) => {
        const regex = new RegExp(`^${endpoint}$`); 
        return regex.test(requestedEndpoint) && roles.includes(userRole);
      }
    );

    if (!authorizedRole) {
      return res.status(403).json({ message: "Forbidden: You do not have the required role." });
    }

    req.user = decoded; 
    next();
  });
}

module.exports = verifyJWT;