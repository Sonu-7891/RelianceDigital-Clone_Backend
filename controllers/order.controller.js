const Order = require("../models/order.model");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Create new order
// @route   POST /api/order
// @access  Private
exports.createOrder = async (req, res, next) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    // Get user's cart
    const cart = await Cart.findOne({ user: req.user.id }).populate({
      path: "items.product",
      select: "name price stock",
    });

    if (!cart || cart.items.length === 0) {
      return next(new ErrorResponse("Cart is empty", 400));
    }

    // Check stock and calculate total
    let totalPrice = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const product = item.product;

      // Check if product still exists
      if (!product) {
        return next(
          new ErrorResponse(`Product ${item.product._id} not found`, 404)
        );
      }

      // Check if enough stock
      if (product.stock < item.quantity) {
        return next(
          new ErrorResponse(`Not enough stock for ${product.name}`, 400)
        );
      }

      // Update stock
      product.stock -= item.quantity;
      await product.save();

      // Add to order items
      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });

      totalPrice += product.price * item.quantity;
    }

    // Create order
    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      totalPrice,
      shippingAddress,
      paymentMethod,
    });

    // Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get user orders
// @route   GET /api/order
// @access  Private
exports.getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate({
        path: "items.product",
        select: "name price images",
      })
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single order
// @route   GET /api/order/:id
// @access  Private
exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate({
      path: "items.product",
      select: "name price images",
    });

    if (!order) {
      return next(
        new ErrorResponse(`Order not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is order owner or admin
    if (order.user.toString() !== req.user.id && req.user.role !== "admin") {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to view this order`,
          401
        )
      );
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update order status
// @route   PUT /api/order/:id
// @access  Private/Admin
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { orderStatus, paymentStatus } = req.body;

    let order = await Order.findById(req.params.id);

    if (!order) {
      return next(
        new ErrorResponse(`Order not found with id of ${req.params.id}`, 404)
      );
    }

    // Update order
    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    await order.save();

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all orders
// @route   GET /api/order/admin
// @access  Private/Admin
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "user",
        select: "name email",
      })
      .populate({
        path: "items.product",
        select: "name price images",
      })
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (err) {
    next(err);
  }
};
