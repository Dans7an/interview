// const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

// @description   Get all users
// @route 	      GET /api/v1/auth/users
// @access        Private/admin
exports.getUsers = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.advancedResults);
});

// @description   Get single user
// @route 	      GET /api/v1/auth/users/:id
// @access        Private/admin
exports.getUser = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.params.id);

	res.status(200).json({
		sucess: true,
		data: user
	});
});

// @description   Create single user
// @route 	      POST /api/v1/auth/users
// @access        Private/admin
exports.createUser = asyncHandler(async (req, res, next) => {
	const user = await User.create(req.body);

	res.status(201).json({
		sucess: true,
		data: user
	});
});

// @description   Update single user
// @route 	      Put /api/v1/auth/users/:id
// @access        Private/admin
exports.updateUser = asyncHandler(async (req, res, next) => {
	const user = await User.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
	});

	res.status(200).json({
		sucess: true,
		data: user
	});
});

// @description   Delete single user
// @route 	      DELETE /api/v1/auth/users/:id
// @access        Private/admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
	await User.findByIdAndDelete(req.params.id);

	res.status(200).json({
		sucess: true,
		data: {}
	});
});
