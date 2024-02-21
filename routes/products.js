const express = require("express");
const { ProductModel } = require("../models/product");
const { authentication } = require("../middlewares/authentication");
const productRoute = express.Router();

productRoute.post("/product", authentication, async (req, res) => {
  try {
    const { title, price, quantity, image } = req.body;
    if (!title || !price || !quantity) {
      return res.status(404).send({ message: "All fields must be provided" });
    }
    const productData = new ProductModel({
      title,
      price,
      quantity,
      img: image,
    });
    const savedData = await productData.save();
    res.status(201).send({
      message: "Product saved successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Error creating product in productRoute",
      error: error.message,
    });
  }
});

productRoute.patch("/product/:productId", authentication, async (req, res) => {
  try {
    const id = req.params.productId;
    const { title, price, quantity } = req.body;
    if (!title || !price || !quantity) {
      return res.status(404).send({ message: "All fields must be provided" });
    }
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      { _id: id },
      {
        title: title,
        price: price,
        quantity: quantity,
      }
    );
    const data = await updatedProduct.save();
    res.status(200).send({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).send({
      message: "Error updating product in productRoute",
      error: error.message,
    });
  }
});

productRoute.delete("/product/:productId", authentication, async (req, res) => {
  try {
    const id = req.params.productId;
    await ProductModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ message: "Product has been deleted" });
  } catch (error) {
    res.status(500).send({
      message: "Error deleting product in productRoute",
      error: error.message,
    });
  }
});

const filterProducts = async (title) => {
  if (title) {
    // If title query parameter is provided, filter products based on title
    return await ProductModel.find({
      title: { $regex: "(?i)" + title },
    });
  } else {
    // If no title query parameter is provided, return all products
    return await ProductModel.find();
  }
};

const sortProducts = (products, sortingValue) => {
  if (sortingValue === "HTL") {
    // Sort products by price: High to Low
    return products.sort((a, b) => b.price - a.price);
  } else if (sortingValue === "LTH") {
    // Sort products by price: Low to High
    return products.sort((a, b) => a.price - b.price);
  } else {
    // If an invalid sorting value is provided, throw an error
    throw new Error("Invalid sorting value");
  }
};

productRoute.get("/products", authentication, async (req, res) => {
  try {
    const title = req.query?.title;
    const sortingValue = req.query?.sortValue;
    const searchQuery = req.query?.search;

    let products = await filterProducts(title);

    if (searchQuery) {
      products = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortingValue) {
      products = sortProducts(products, sortingValue);
    }

    res.status(200).send(products);
  } catch (error) {
    res.status(400).send({
      message: "Error in productRoute",
      error: error.message,
    });
  }
});

module.exports = {
  productRoute,
};
