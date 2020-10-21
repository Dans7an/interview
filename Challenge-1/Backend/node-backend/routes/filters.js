const express = require('express');
const {
  getFilters,
  createFilter,
  updateFilter,
  deleteFilter,
  sortCategories,
  sortFilters
} = require('../controllers/filters');

const router = express.Router();
const Filter = require('../models/Filter');
const advanceResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(advanceResults(Filter, 'filters'), getFilters)
  .post(protect, authorize('publisher', 'admin'), createFilter);

router
  .route('/sort/categories') 
  .post(protect, authorize('publisher', 'admin'), sortCategories);

router
  .route('/sort/filters') 
  .post(protect, authorize('publisher', 'admin'), sortFilters);

router
  .route('/:id')
  .put(protect, authorize('publisher', 'admin'), updateFilter)
  .delete(protect, authorize('publisher', 'admin'), deleteFilter);

module.exports = router;
