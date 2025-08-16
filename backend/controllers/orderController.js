const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  const { items, total, address, phone } = req.body;
  const userId = req.user.id;

  try {
    const newOrder = await Order.create({ items, total, address, phone, userId });
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user.id });
  res.json(orders);
};
