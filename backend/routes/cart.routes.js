const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/', protect, cartController.getCart);
router.post('/add', protect, cartController.addToCart);
router.put('/:itemId', protect, cartController.updateQuantity);
router.delete('/clear', protect, cartController.clearCart); // Clear all items
router.delete('/:itemId', protect, cartController.removeFromCart);

module.exports = router;
