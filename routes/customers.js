const express = require('express');
const router = express.Router();
const customers = require('../controllers/customers');

router.route('/')
    .get(customers.index)
    .post(customers.createCustomer)

router.get('/new', customers.renderNewForm)
router.get('/:id', customers.showCustomer)


module.exports = router;