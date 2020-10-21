const express = require('express');
const {
	getContents,
	createContent,
	updateContent,
	deleteContent,
} = require('../controllers/content');

const router = express.Router();
const Content = require('../models/Content');
const advanceResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router
	.route('/')
	.get(advanceResults(Content, 'contents'), getContents)
	.post(protect, authorize('publisher', 'admin'), createContent);

router
	.route('/:id')
	.put(protect, authorize('publisher', 'admin'), updateContent)
	.delete(protect, authorize('publisher', 'admin'), deleteContent);

module.exports = router;
