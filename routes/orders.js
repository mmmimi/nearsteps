const express = require("express");
const router = express.Router();
const Orders = require("../controllers/orders");

router.route("/").get(Orders.index).post(Orders.createOrder);

router.get("/new", Orders.renderNewForm);
router.get("/:id", Orders.getOrder);

module.exports = router;
