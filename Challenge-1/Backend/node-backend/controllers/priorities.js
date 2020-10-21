// const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Priority = require('../models/Priority');
const Product = require('../models/Product');
const Story = require('../models/Story');
const collections = [
  Product,
  Story
];


// @description   Get all filters
// @route         GET /api/v1/filters
// @access        Private/admin
exports.getPriorities = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @description   Get single filters
// @route         GET /api/v1/auth/filters/:id
// @access        Private/admin
exports.getPriority = asyncHandler(async (req, res, next) => {
  const priorities = await Priority.findById(req.params.id);

  res.status(200).json({
    sucess: true,
    data: priorities
  });
});

// @description   Create single filters
// @route         POST /api/v1/auth/filters
// @access        Private/admin
exports.createPriority = asyncHandler(async (req, res, next) => {

  //Create
  const priorities = await Priority.create(req.body);

  res.status(201).json({
    sucess: true,
    data: priorities
  });
});

// @description   Update single filters
// @route         Put /api/v1/auth/filters/:id
// @access        Private/admin
exports.updatePriority = asyncHandler(async (req, res, next) => {


  //Update
  let priority = await Priority.findById(req.params.id);

  if (!priority) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
    );
  }


  priority = await Priority.findOneAndUpdate({ '_id': req.params.id }, req.body, {
    runValidators: true
  });

  res.status(200).json({
    sucess: true,
    data: priority
  });
});

// @description   Delete single filters
// @route         DELETE /api/v1/auth/filters/:id
// @access        Private/admin
exports.deletePriority = asyncHandler(async (req, res, next) => {
  await Priority.findByIdAndDelete(req.params.id);

  res.status(200).json({
    sucess: true,
    data: {}
  });
});


exports.sortPriorities = asyncHandler(async (req, res, next) => {

  //Update Priorities
  var sorts = req.body;

  for (var i = 0, l = sorts.length; i < l; i++) {
    await Priority.findByIdAndUpdate(sorts[i].id, { psorted: sorts[i].pos });
  }

  for (var j = 0, l_ = collections.length; j < l_; j++) {
    var model = collections[j];

    await model.updateMany({}, { psorted: 999 });

    for (var i = 0, l = sorts.length; i < l; i++) {
      var filter = "(?=.*" + sorts[i].name + ").*";
      await model.updateMany({ tag: { $regex: filter } }, { psorted: sorts[i].pos });
    }
  }

  res.status(201).json({
    sucess: true
  });
});

















