// const crypto = require('crypto');
const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Content = require('../models/Content');
const s3 = require('../config/s3');

// @description   Get all contents
// @route 	      GET /api/v1/auth/contents
// @access        Private/admin
exports.getContents = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.advancedResults);
});

// @description   Create single content
// @route 	      POST /api/v1/auth/content
// @access        Private/admin
exports.createContent = asyncHandler(async (req, res, next) => {
	const content = await Content.create(req.body);

	res.status(201).json({
		sucess: true,
		data: content,
	});
});

// @description   Update single content
// @route 	      Put /api/v1/auth/content/:id
// @access        Private/admin
exports.updateContent = asyncHandler(async (req, res, next) => {

	if (req.body.content) {
		req.body.content = JSON.parse(req.body.content);
	}

	var params = {
		Bucket: 'kat-api',
		Body: '',
		Key: '',
		ACL: 'public-read'
	};

	if (req.files) {

		if (req.files.image) {
			let file = req.files.image;
			params.Body = file.data;
			params.Key = "banner/" + Date.now() + "_" + path.basename(file.name);
			let data = await s3.upload(params).promise();
			req.body.banner = data.Location
			delete req.files.image
		}

		for (var field in req.files) {
			var field_name = field.split('_');
			if (field_name[0] == 'cimg') {
				let file = req.files[field];
				params.Body = file.data;
				params.Key = field_name[1] + "/" + Date.now() + "_" + path.basename(file.name);
				let data = await s3.upload(params).promise();
				if (typeof field_name[2] != 'undefined') {

					if (typeof req.body['content'][field_name[1]] == 'undefined') {
						req.body['content'][field_name[1]] = [];
					}

					req.body['content'][field_name[1]][field_name[2]] = data.Location
				} else {
					req.body['content'][field_name[1]] = data.Location
				}
			}
		}
	}


	const content = await Content.findOneAndUpdate({ '_id': req.params.id }, req.body, {
		runValidators: true,
	});

	res.status(200).json({
		sucess: true,
		data: content,
	});
});

// @description   Delete single content
// @route 	      DELETE /api/v1/auth/content/:id
// @access        Private/admin
exports.deleteContent = asyncHandler(async (req, res, next) => {
	await content.findByIdAndDelete(req.params.id);

	res.status(200).json({
		sucess: true,
		data: {},
	});
});








