const express = require("express");
const { getProducts, addProduct } = require("../controllers/productController");
const router = express.Router();

router.get("/", getProducts);
router.post("/", addProduct); // Optional: protect with admin

module.exports = router;
