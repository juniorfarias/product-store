import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "../models/product.model.js";
import mongoose from "mongoose"; // MongoDB Module

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    console.log(products);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error to get products: ", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/api/products", async (req, res) => {
  const product = req.body; // user will send this data

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, error: "Please fill all the fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log("Error to create a new product: ", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res
      .status(400)
      .json({ success: false, error: "Please, fill the product id." });

  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, error: "Product not found" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.log("Error to update a product: ", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, data: "Product deleted" });
  } catch (error) {
    res.status(404).json({ success: false, error: "Product not found" });
  }
});

app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});
