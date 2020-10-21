const express = require('express');
const {
  getPriorities,
  createPriority,
  updatePriority,
  deletePriority,
  sortPriorities
} = require('../controllers/priorities');

const Priority = require('../models/Priority');

const router = express.Router();
const advanceResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(protect, authorize('publisher', 'admin'), advanceResults(Priority, 'priorities'), getPriorities)
  .post(protect, authorize('publisher', 'admin'), createPriority);

router
  .route('/:id')
  .put(protect, authorize('publisher', 'admin'), updatePriority)
  .delete(protect, authorize('publisher', 'admin'), deletePriority);

router
  .route('/sort') 
  .post(protect, authorize('publisher', 'admin'), sortPriorities);

module.exports = router;
