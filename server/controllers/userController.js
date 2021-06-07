import dbConn from "../config/db.js";
import util from "util";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

const authUser = asyncHandler(async (req, res, next) => {
  const query = util.promisify(dbConn.query).bind(dbConn);
  try {
    const { email, password } = req.body;
    const userArray = await query(
      `SELECT * FROM ecomm.users u where u.email = "${email}"`
    );
    if (userArray.length === 0) {
      throw new Error("Invalid Credentials");
    }

    const user = userArray[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid Credentials");
    }

    res.json({
      id: user.user_id,
      name: user.name,
      email: user.email,
      isAdmin: user.is_admin,
      phoneNumber: user.phone_number,
      token: generateToken(user.user_id),
    });
  } catch (error) {
    res.status(401);
    throw new Error(error);
  }
});

const registerUser = asyncHandler(async (req, res, next) => {
  const query = util.promisify(dbConn.query).bind(dbConn);
  try {
    const { name, email, password, phone } = req.body;
    const userArray = await query(
      `SELECT * FROM ecomm.users u where u.email = "${email}"`
    );
    if (userArray.length > 0 || !name || !email || !password || !phone) {
      throw new Error("User data incorrect");
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const insertUser = `INSERT INTO ecomm.users 
        (name, email, password, is_admin, phone_number) 
        VALUES('${name}', '${email}', '${encryptedPassword}', 0, '${phone}');`;
    const result = await query(insertUser);

    res.status(201).json({
      id: result.insertId,
      name: name,
      email: email,
      isAdmin: false,
      phoneNumber: phone,
      token: generateToken(result.insertId),
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const getUserProfile = asyncHandler(async (req, res, next) => {
  const query = util.promisify(dbConn.query).bind(dbConn);
  try {
    const user = req.user;
    if (user) {
      res.json({
        id: user.user_id,
        name: user.name,
        email: user.email,
        isAdmin: user.is_admin,
        phone: user.phone_number,
      });
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

const updateUserProfile = asyncHandler(async (req, res, next) => {
  const query = util.promisify(dbConn.query).bind(dbConn);
  const { id, name, password, email, phone } = req.body;
  let encryptedPassword;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    encryptedPassword = await bcrypt.hash(password, salt);
  }
  try {
    const user = req.user;
    if (user) {
      const updateResult = await query(`UPDATE ecomm.users
        SET name='${name || user.name}', 
        email='${email || user.email}', 
        password='${encryptedPassword || user.password}', 
        phone_number='${phone || user.phone_number}'
        WHERE user_id=${user.user_id}`);
      res.json({
        id: user.user_id,
        name: name || user.name,
        email: email || user.email,
        isAdmin: user.is_admin,
        phoneNumber: phone || user.phone_number,
        token: generateToken(user.user_id),
      });
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

// Admin routes

const getUsers = asyncHandler(async (req, res, next) => {
  const query = util.promisify(dbConn.query).bind(dbConn);
  try {
    const users = await query(`SELECT * FROM ecomm.users`);
    res.json(users);
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

const deleteUser = asyncHandler(async (req, res, next) => {
  const query = util.promisify(dbConn.query).bind(dbConn);
  try {
    const userID = req.params.id;
    const users = await query(
      `DELETE FROM ecomm.users where user_id=${userID}`
    );
    res.json(users);
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

const getUserById = asyncHandler(async (req, res, next) => {
  const query = util.promisify(dbConn.query).bind(dbConn);
  try {
    const userId = req.params.id;
    const user = await query(
      `SELECT * FROM ecomm.users where user_id = ${userId}`
    );
    if (user.length === 0) {
      throw new Error("User not found");
    } else {
      res.json(user[0]);
    }
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

const updateUserById = asyncHandler(async (req, res, next) => {
  const query = util.promisify(dbConn.query).bind(dbConn);
  const { id, name, isAdmin, email, phone } = req.body;
  try {
    const userArr = await query(
      `SELECT * FROM ecomm.users where user_id = ${id}`
    );
    let user = {};
    if (userArr.length > 0) {
      user = userArr[0];
    }
    if (user) {
      const updateResult = await query(`UPDATE ecomm.users
        SET name='${name}', 
        email='${email}', 
        is_admin='${Boolean(isAdmin) ? 1 : 0}', 
        phone_number='${phone || user.phone_number}'
        WHERE user_id=${id}`);
      res.json({
        id: user.user_id,
        name: name || user.name,
        email: email || user.email,
        isAdmin: isAdmin,
        phoneNumber: phone || user.phone_number,
      });
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUserById,
};
