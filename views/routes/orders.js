const express = require("express");
const router = express.Router();
const Orders = require("../controllers/orders");

router.route("/").get(Orders.index).post(Orders.createCustomer);

router.get("/new", Orders.renderNewForm);
router.get("/:id", Orders.showCustomer);

module.exports = router;
