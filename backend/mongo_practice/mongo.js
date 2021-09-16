const mongoose = require('mongoose');

const Product = require('./models/product');

const url = "mongodb://127.0.0.1:27017/mongotest";

mongoose.connect(url).then(() => {
  console.log('Connected to database');
}).catch(() => {
  console.log('Connection failed');
});

const createProduct = async (req, res, next) => {
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price
  });
  const result = await createdProduct.save();
  res.json(result);
};

const getProducts = async (req, res, next) => {
  const products = await Product.find({name: "hello1"}).exec();
  console.log(products);
  res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;