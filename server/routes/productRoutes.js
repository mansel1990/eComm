import express from "express";
const router = express.Router();
import dbConn from "../config/db.js";
import util from "util";

router.get("/", async (req, res) => {
  const query = util.promisify(dbConn.query).bind(dbConn);
  try {
    const products = await query("SELECT * FROM ecomm.products order by id");
    res.json(products);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/:id", async (req, res) => {
  const query = util.promisify(dbConn.query).bind(dbConn);
  try {
    const product = await query(
      `SELECT * from ecomm.products where id = ${req.params.id}`
    );
    if (product.length > 0) {
      res.json(product[0]);
    } else {
      res.status(404).json("Product Not Found!!");
    }
  } catch (error) {
    res.status(404);
    console.log(`Error`.red.bold);
    throw new Error(error.message);
  }
});

export default router;
