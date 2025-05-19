const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
exports.getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate({
      path: "items.product",
      select: "name price images stock",
    });

    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
    }

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return next(new ErrorResponse("Product not found", 404));
    }

    // Check if product is in stock
    if (product.stock < quantity) {
      return next(new ErrorResponse("Product is out of stock", 400));
    }

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      // Create new cart if it doesn't exist
      cart = await Cart.create({
        user: req.user.id,
        items: [{ product: productId, quantity, price: product.price }],
      });
    } else {
      // Check if product already exists in cart
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        // Update quantity if product exists
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add new product to cart
        cart.items.push({
          product: productId,
          quantity,
          price: product.price,
        });
      }

      await cart.save();
    }

    // Populate product details
    cart = await cart.populate({
      path: "items.product",
      select: "name price images stock",
    });

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:itemId
// @access  Private
exports.updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return next(new ErrorResponse("Cart not found", 404));
    }

    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === req.params.itemId
    );

    if (itemIndex === -1) {
      return next(new ErrorResponse("Item not found in cart", 404));
    }

    // Check product stock
    const product = await Product.findById(cart.items[itemIndex].product);
    if (product.stock < quantity) {
      return next(new ErrorResponse("Product is out of stock", 400));
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    // Populate product details
    await cart.populate({
      path: "items.product",
      select: "name price images stock",
    });

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:itemId
// @access  Private
exports.removeFromCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return next(new ErrorResponse("Cart not found", 404));
    }

    cart.items = cart.items.filter(
      (item) => item._id.toString() !== req.params.itemId
    );

    await cart.save();

    // Populate product details
    await cart.populate({
      path: "items.product",
      select: "name price images stock",
    });

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
exports.clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return next(new ErrorResponse("Cart not found", 404));
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (err) {
    next(err);
  }
};
