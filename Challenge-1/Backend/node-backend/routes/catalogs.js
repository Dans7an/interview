const express = require('express');
const {
	getCatalogs,
	createCatalog,
	updateCatalog,
	deleteCatalog
} = require('../controllers/catalog');

const router = express.Router();
const Catalog = require('../models/Catalog');
const advanceResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router
	.route('/')
	.get(advanceResults(Catalog, 'abouts'), getCatalogs)
	.post(protect, authorize('publisher', 'admin'), createCatalog);

router
	.route('/:id')
	.put(protect, authorize('publisher', 'admin'), updateCatalog)
	.delete(protect, authorize('publisher', 'admin'), deleteCatalog);

module.exports = router;
