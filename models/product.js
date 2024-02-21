const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    img: { type: String },
    title: { type: String },
    price: { type: Number },
    quantity: { type: Number },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = { ProductModel };
