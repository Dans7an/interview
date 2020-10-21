// const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Filter = require('../models/Filter');
const path = require('path');
const s3 = require('../config/s3');


// @description   Get all filters
// @route         GET /api/v1/filters
// @access        Private/admin
exports.getFilters = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @description   Get single filters
// @route         GET /api/v1/auth/filters/:id
// @access        Private/admin
exports.getFilter = asyncHandler(async (req, res, next) => {
  const filters = await Filter.findById(req.params.id);

  res.status(200).json({
    sucess: true,
    data: filters
  });
});

// @description   Create single filters
// @route         POST /api/v1/auth/filters
// @access        Private/admin
exports.createFilter = asyncHandler(async (req, res, next) => {

  if (req.files && req.files.image) {
    const file = req.files.image;
    var params = {
      Bucket: 'kat-api',
      Body: file.data,
      Key: "filters/" + Date.now() + "_" + path.basename(file.name),
      ACL: 'public-read'
    };
    const data = await s3.upload(params).promise();
    req.body.image = data.Location
  }

  const similar = await Filter.findOne({ type: req.body.type, category: req.body.category });

  if (similar) {
    req.body.csorted = similar.csorted;
  }

  req.body.fsorted = 100;

  const filters = await Filter.create(req.body);

  res.status(201).json({
    sucess: true,
    data: filters
  });
});

// @description   Update single filters
// @route         Put /api/v1/auth/filters/:id
// @access        Private/admin
exports.updateFilter = asyncHandler(async (req, res, next) => {

  if (req.files && req.files.image) {
    const file = req.files.image;
    var params = {
      Bucket: 'kat-api',
      Body: file.data,
      Key: "filters/" + Date.now() + "_" + path.basename(file.name),
      ACL: 'public-read'
    };

    const data = await s3.upload(params).promise();
    req.body.image = data.Location
  }

  if (!req.body.image) {
    delete req.body.image;
  }

  const filters = await Filter.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    sucess: true,
    data: filters
  });
});

// @description   Delete single filters
// @route         DELETE /api/v1/auth/filters/:id
// @access        Private/admin
exports.deleteFilter = asyncHandler(async (req, res, next) => {
  await Filter.findByIdAndDelete(req.params.id);

  res.status(200).json({
    sucess: true,
    data: {}
  });
});


exports.sortCategories = asyncHandler(async (req, res, next) => {
  var sorts = req.body;
  var type = req.query.type;
  for (var i = 0, l = sorts.length; i < l; i++) {
    var update = await Filter.updateMany({ type: type, category: sorts[i].name }, { $set: { csorted: sorts[i].pos } });
  }

  res.status(201).json({
    sucess: true
  });

});

exports.sortFilters = asyncHandler(async (req, res, next) => {
  var sorts = req.body;

  for (var i = 0, l = sorts.length; i < l; i++) {
    var update = await Filter.findByIdAndUpdate(sorts[i].id, { fsorted: sorts[i].pos });
  }

  res.status(201).json({
    sucess: true
  });

});

















