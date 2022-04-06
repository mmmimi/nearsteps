const Orders = require("../models/customers");

module.exports.index = async (req, res) => {
  const orders = await Orders.find({});
  res.render("order/index", { orders });
};

module.exports.renderNewForm = (req, res) => {
  res.render("order/new");
};

module.exports.getOrder = async (req, res) => {
  const order = await Orders.findById(req.params.id);
  res.render("order/show", { order });
};

module.exports.createOrder = async (req, res, next) => {
  const order = new Orders(req.body.order);
  await order.save();
  res.redirect(`/order/${order._id}`);
};
