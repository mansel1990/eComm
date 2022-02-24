import dbConn from "../config/db.js";
import util from "util";
import asyncHandler from "express-async-handler";

const getProducts = asyncHandler(async (req, res) => {
  const query = util.promisify(dbConn.query).bind(dbConn);
  try {
    const products = await query("SELECT * FROM ecomm.products order by id");
    res.json(products);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const getProductById = asyncHandler(async (req, res) => {
  const query = util.promisify(dbConn.query).bind(dbConn);
  try {
    const product = await query(
      `SELECT * from ecomm.products where id = ${req.params.id}`
    );
    if (product.length > 0) {
      res.json(product[0]);
    } else {
      res.status(404);
      throw new Error("Product Not Found!!");
    }
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const query = util.promisify(dbConn.query).bind(dbConn);
  try {
    const productId = req.params.id;
    const products = await query(
      `DELETE FROM ecomm.products where id=${productId}`
    );
    console.log(products);
    res.json({ message: "Product Removed" });
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

export { getProducts, getProductById, deleteProduct };
