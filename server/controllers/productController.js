import dbConn from "../config/db.js";
import util from "util";
import asyncHandler from "express-async-handler";

const getProducts = asyncHandler(async (req, res) => {
  const query = util.promisify(dbConn.query).bind(dbConn);
  try {
    const products = await query(`SELECT * FROM products order by id`);
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
      `SELECT * from products where id = ${req.params.id}`
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
    const products = await query(`DELETE FROM products where id=${productId}`);
    console.log(products);
    res.json({ message: "Product Removed" });
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const query = util.promisify(dbConn.query).bind(dbConn);
  try {
    /* INSERT INTO products
      (name, description, price, countInStock, image)
      VALUES('', '', 0, 0, ''); */
    const name = "Soap Name";
    const description = "Soap description";
    const price = 250;
    const quantity = 1;
    const insertUser = `INSERT INTO products 
      (name, description, price, countInStock, image) 
      VALUES('${name}', '${description}', ${price}, ${quantity}, '');`;
    const result = await query(insertUser);

    res.status(201).json({
      id: result.insertId,
      name: name,
      description,
      price,
      quantity,
    });
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

export { getProducts, getProductById, deleteProduct };
