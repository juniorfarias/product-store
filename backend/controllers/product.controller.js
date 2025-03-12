import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    console.log(products);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error to get products: ", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createProduct = async (req, res) => {
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
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res
      .status(400)
      .json({ success: false, error: "Please, fill the product id." });

  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, error: "Product not found" });
  }

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, error: "Please fill all the fields" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    console.log("Product updated");
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.log("Error to update a product: ", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, error: "Product not found" });
  }

  try {
    await Product.findByIdAndDelete(id);
    console.log("Product deleted");
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log("Error to delete a product: ", error.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
