const Orders = require("../models/orders");

module.exports.index = async (req, res) => {
  const orders = await Orders.find({});
  res.render("orders/index", { orders });
};

module.exports.renderNewForm = (req, res) => {
  res.render("orders/new");
};

module.exports.getOrder = async (req, res) => {
  const order = await Orders.findById(req.params.id);
  res.render("orders/edit", { order });
};

module.exports.createOrder = async (req, res, next) => {
  const order = new Orders(req.body.order);
  await order.save();
  res.redirect(`/orders/${order._id}`);
};
