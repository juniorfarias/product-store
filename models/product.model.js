import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      riquired: true,
    },
    image: {
      type: String,
      riquired: true,
    },
  },
  {
    timestamps: true, //createdAt and updatedAt are added
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
