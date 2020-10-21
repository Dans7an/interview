const express = require('express');
const {
	getCollection,
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
	productPhotoUpload,
	sampleProduct
} = require('../controllers/products');

const Product = require('../models/Product');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router
	.route('/')
	.get(getCollection, getProducts)
	.post(protect, authorize('publisher', 'admin'), createProduct);

router
	.route('/:id')
	.get(getProduct)
	.put(protect, authorize('publisher', 'admin'), updateProduct)
	.delete(protect, authorize('publisher', 'admin'), deleteProduct);

router
	.route('/sample')
	.post(protect, sampleProduct);

module.exports = router;
