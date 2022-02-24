import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import dbConn from "../config/db.js";
import util from "util";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log(decoded);
      const query = util.promisify(dbConn.query).bind(dbConn);
      const users = await query(
        `SELECT * FROM ecomm.users u where u.user_id = "${decoded.id}"`
      );

      req.user = users[0];

      next();
    } catch (err) {
      res.status(401);
      throw new Error("Not Authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.is_admin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };
