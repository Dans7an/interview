const express = require('express');
const {
	getNews,
	getNew,
	createNew,
	updateNews,
	deleteNews
} = require('../controllers/news');

const router = express.Router();
const New = require('../models/New');
const advanceResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router
	.route('/')
	.get(advanceResults(New, 'news'), getNews)
	.post(protect, authorize('publisher', 'admin'), createNew);

router
	.route('/:id')
	.get(getNew)
	.put(updateNews)
	.delete(deleteNews);

module.exports = router;
