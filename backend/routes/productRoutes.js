const express = require('express');
const router = express.Router();
const { getProducts, getProductById } = require('../controllers/productController');
const { createProductReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware'); // On va le créer juste après

// Route: /api/products
router.route('/').get(getProducts);

// Route: /api/products/:id
router.route('/:id').get(getProductById);

// Route: /api/products/:id/reviews
// PROTECT: Seuls les users connectés peuvent poster
router.route('/:id/reviews').post(protect, createProductReview);

module.exports = router;