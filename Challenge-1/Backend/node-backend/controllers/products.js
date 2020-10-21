const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Product = require('../models/Product');
const Story = require('../models/Story');
const advanceResults = require('../middleware/advancedResults');
const s3 = require('../config/s3');
const collections = {
	storys: Story,
	products: Product
};

const skuf = {
	storys: 'story_id',
	products: 'item_code'
};


exports.getCollection = asyncHandler((req, res, next) => {
	let db = req.query.db;

	if (typeof collections[db] != 'undefined') {
		model = collections[db];
	} else {
		model = Product;
	}

	advanceResults(model, 'products')(req, res, next);
});

// @description   Get all Products
// @route GET     GET /api/v1/products
// @access        Public
exports.getProducts = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.advancedResults);
});

// @description   Get single Product
// @route GET     GET /api/v1/product/:id
// @access        Public
exports.getProduct = asyncHandler(async (req, res, next) => {

	let db = req.query.db;

	if (typeof collections[db] != 'undefined') {
		model = collections[db];
	} else {
		model = Product;
	}

	const product = await model.findById(req.params.id).populate('similar');

	if (!product) {
		return next(
			new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
		);
	}

	let total = await model.count();
	let random = Math.floor(Math.random() * total);
	let similars = await model.find().skip(random).limit(3);

	res.status(200).json({ success: true, data: product, similars: similars });
});

// // @description   Create new Product
// // @route GET     POST /api/v1/products/:id
// // @access        Private
exports.createProduct = asyncHandler(async (req, res, next) => {

	let db = req.query.db;
	let sku = false;

	if (typeof collections[db] != 'undefined') {
		model = collections[db];
		sku = skuf[db];
	} else {
		model = Product;
		sku = 'item_code';
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
			params.Key = "products/" + Date.now() + "_" + path.basename(file.name);
			let data = await s3.upload(params).promise();
			req.body.image = data.Location
		}

		if (req.files.glamour) {
			let file = req.files.glamour;
			params.Body = file.data;
			params.Key = "products/" + Date.now() + "_" + path.basename(file.name);
			let data = await s3.upload(params).promise();
			req.body.glamour = data.Location
		}
	}


	req.body[sku] = req.body.sku;
	delete req.body.sku;

	const product = await model.create(req.body);

	res.status(201).json({
		success: true,
		data: product
	});
});

// // @description   Update Product
// // @route GET     PUT /api/v1/products/:id
// // @access        Private
exports.updateProduct = asyncHandler(async (req, res, next) => {

	let db = req.query.db;

	if (typeof collections[db] != 'undefined') {
		model = collections[db];
	} else {
		model = Product;
	}


	var params = {
		Bucket: 'kat-api',
		Body: '',
		Key: '',
		ACL: 'public-read'
	};

	if (typeof req.body.extra_images == 'undefined' || req.body.extra_images == '') {
		req.body.extra_images = [];
	} else {
		req.body.extra_images = req.body.extra_images.split(',');
	}

	if (req.files) {

		if (req.files.image) {
			let file = req.files.image;
			params.Body = file.data;
			params.Key = "products/" + Date.now() + "_" + path.basename(file.name);
			let data = await s3.upload(params).promise();
			req.body.image = data.Location
			delete req.files.image;
		}

		if (req.files.glamour) {
			let file = req.files.glamour;
			params.Body = file.data;
			params.Key = "products/" + Date.now() + "_" + path.basename(file.name);
			let data = await s3.upload(params).promise();
			req.body.glamour = data.Location
			delete req.files.glamour;
		}


		for (var field in req.files) {
			var field_name = field.split('_');
			if (field_name[0] == 'extraimages') {
				let file = req.files[field];
				params.Body = file.data;
				params.Key = "products/" + Date.now() + "_" + path.basename(file.name);
				let data = await s3.upload(params).promise();
				req.body.extra_images[field_name[1]] = data.Location;
			}
		}
	}


	if (req.body.similar) {
		req.body.similar = JSON.parse(req.body.similar);
	}


	let product = await model.findById(req.params.id);

	if (!product) {
		return next(
			new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
		);
	}


	product = await model.findOneAndUpdate({ '_id': req.params.id }, req.body, {
		runValidators: true
	});

	res.status(200).json({ success: true, data: product });
});

// // @description   Delete Product
// // @route DELETE     DELETE /api/v1/products/:id
// // @access        Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {

	let db = req.query.db;

	if (typeof collections[db] != 'undefined') {
		model = collections[db];
	} else {
		model = Product;
	}

	const product = await model.findById(req.params.id);

	if (!product) {
		return next(
			new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
		);
	}

	product.remove();

	res.status(200).json({ success: true, data: {} });
});



exports.sampleProduct = asyncHandler(async (req, res, next) => {
	var body = [];
	var labels = {
		first_name: 'First Name',
		last_name: 'Last Name',
		company_name: 'Company',
		phone_number: 'Phone',
		address: 'Address',
		state: 'State',
		city: 'City',
		zipcode: 'Zip Code',
		email: 'Email',
		notes: 'Message',
	};

	for (var i = 0, l = req.body.length; i < l; i++) {
		var input = req.body[i];


		if (input.name == 'products') {
			const products = JSON.parse(input.value);
			body.push('PRODUCTS:')

			for (var j = 0, k = products.length; j < k; j++) {
				var p = products[j];
				var sku = p.item_code || p.story_id
				body.push(`${p.name} - ${sku}`);
			}
		} else {
			var label = labels[input.name];
			body.push(`${label}: ${input.value}`);
		}
	}


	const sgMail = require('@sendgrid/mail');
	sgMail.setApiKey(process.env.SMTP_PASSWORD);
	const msg = {
		to: process.env.TO_EMAIL,
		from: process.env.FROM_EMAIL,
		subject: 'New Sample Request',
		text: body.join("\n\r"),
		html: body.join("<br>"),
	};
	console.log(sgMail.send(msg));

	res.status(200).json({ success: true, data: {} });
});











