// const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const New = require('../models/New');
const path = require('path');
const s3 = require('../config/s3');


// @description   Get all news
// @route 	      GET /api/v1/auth/news
// @access        Private/admin
exports.getNews = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.advancedResults);
});

// @description   Get single news
// @route 	      GET /api/v1/auth/news/:id
// @access        Private/admin
exports.getNew = asyncHandler(async (req, res, next) => {
	const news = await New.findById(req.params.id);

	res.status(200).json({
		sucess: true,
		data: news
	});
});

// @description   Create single news
// @route 	      POST /api/v1/auth/news
// @access        Private/admin
exports.createNew = asyncHandler(async (req, res, next) => {

	if (req.files && req.files.image) {
		const file = req.files.image;
		var params = {
			Bucket: 'kat-api',
			Body: file.data,
			Key: "news/" + Date.now() + "_" + path.basename(file.name),
			ACL: 'public-read'
		};

		const data = await s3.upload(params).promise();
		req.body.image = data.Location
		req.body.iframe = '';
	}

	if (!req.body.iframe) {
		req.body.iframe = '';
	}


	const news = await New.create(req.body);

	res.status(201).json({
		sucess: true,
		data: news
	});
});

// @description   Update single news
// @route 	      Put /api/v1/auth/news/:id
// @access        Private/admin
exports.updateNews = asyncHandler(async (req, res, next) => {


	if (req.files && req.files.image) {
		const file = req.files.image;
		var params = {
			Bucket: 'kat-api',
			Body: file.data,
			Key: "news/" + Date.now() + "_" + path.basename(file.name),
			ACL: 'public-read'
		};

		const data = await s3.upload(params).promise();
		req.body.image = data.Location
	}

	if (!req.body.image) {
		delete req.body.image;
	}

	if (!req.body.iframe) {
		delete req.body.iframe;
	}


	const news = await New.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
	});

	res.status(200).json({
		sucess: true,
		data: news
	});
});

// @description   Delete single news
// @route 	      DELETE /api/v1/auth/news/:id
// @access        Private/admin
exports.deleteNews = asyncHandler(async (req, res, next) => {
	await New.findByIdAndDelete(req.params.id);

	res.status(200).json({
		sucess: true,
		data: {}
	});
});
