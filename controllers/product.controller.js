const Product = require("../models/product.model");
const Category = require("../models/category.model");
const ErrorResponse = require("../utils/errorResponse");
const { sortProducts } = require("../utils/customSort");
const { searchProducts, searchByPriceRange } = require("../utils/binarySearch");

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res, next) => {
  try {
    let query;

    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = [
      "select",
      "sort",
      "page",
      "limit",
      "search",
      "minPrice",
      "maxPrice",
    ];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach((param) => delete reqQuery[param]);

    // Handle category name query
    if (reqQuery.category) {
      const category = await Category.findOne({ name: reqQuery.category });
      if (!category) {
        return res.status(404).json({
          success: false,
          error: `Category "${reqQuery.category}" not found`,
        });
      }
      reqQuery.category = category._id;
    }

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    // Finding resource
    query = Product.find(JSON.parse(queryStr)).populate("category");

    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(",").join(" ");
      query = query.select(fields);
    }

    // Search
    if (req.query.search) {
      const products = await query;
      const searchResults = searchProducts(products, req.query.search);
      return res.status(200).json({
        success: true,
        count: searchResults.length,
        data: searchResults,
      });
    }

    // Price Range
    if (req.query.minPrice || req.query.maxPrice) {
      const products = await query;
      const minPrice = req.query.minPrice || 0;
      const maxPrice = req.query.maxPrice || Number.MAX_SAFE_INTEGER;
      const priceResults = searchByPriceRange(products, minPrice, maxPrice);
      return res.status(200).json({
        success: true,
        count: priceResults.length,
        data: priceResults,
      });
    }

    // Sort
    if (req.query.sort) {
      const products = await query;
      const [sortBy, order] = req.query.sort.split(",");
      const sortedProducts = sortProducts(products, sortBy, order);
      return res.status(200).json({
        success: true,
        count: sortedProducts.length,
        data: sortedProducts,
      });
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Product.countDocuments();

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const products = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    res.status(200).json({
      success: true,
      count: products.length,
      pagination,
      data: products,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");

    if (!product) {
      return next(
        new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(
        new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
      );
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(
        new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
      );
    }

    await product.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};
