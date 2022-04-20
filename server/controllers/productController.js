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
    const product = await query(
      `SELECT * from products where id = ${productId}`
    );
    if (product.length > 0) {
      const products = await query(
        `DELETE FROM products where id=${productId}`
      );
      console.log(products);
      res.json({ message: "Product Removed" });
    } else {
      res.status(404);
      throw new Error("Product Not Found!!");
    }
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const query = util.promisify(dbConn.query).bind(dbConn);
  try {
    const { name, description, price, countInStock } = req.body.product;
    const insertUser = `INSERT INTO products 
      (name, description, price, countInStock, image) 
      VALUES('${name}', '${description}', ${price}, ${countInStock}, '');`;
    const result = await query(insertUser);

    res.status(201).json({
      id: result.insertId,
      name: name,
      description,
      price,
      countInStock,
    });
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

const editProduct = asyncHandler(async (req, res) => {
  const query = util.promisify(dbConn.query).bind(dbConn);
  try {
    const { id, name, description, price, countInStock } = req.body.product;

    const prodArr = await query(`SELECT * FROM products where id = ${id}`);
    let product = {};
    if (prodArr.length > 0) {
      product = prodArr[0];
    }

    if (product) {
      const updateResult = await query(`UPDATE products
        SET name='${name}', 
        description='${description}', 
        price='${price}', 
        countInStock='${countInStock}'
        WHERE id=${id}`);
      res.json({
        id: product.id,
        name: name || product.name,
        description: description || product.description,
        price: price || product.price,
        countInStock: countInStock || product.countInStock,
      });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  editProduct,
};
