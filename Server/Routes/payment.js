const express = require('express');
const router = express.Router();
const paymentController = require('../Controllers/payment');
const auth = require('../middleware/auth');

router.post('/upgrade', auth, paymentController.upgradePlan);

module.exports = router;
