const mongoose = require('mongoose');
const slugify = require('slugify');

const ProductSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please add a name'],
		trim: true,
		maxlength: [100, 'Name can not be more than 50 characters'],
	},
	slug: String,
	description: {
		type: String,
		maxlength: [500, 'Description can not be more than 500 characters'],
	},
	image: {
		type: String,
	},
	priority: {
		type: Number
	},
	tag: {
		type: String,
	},
	item_code: {
		type: String,
		required: [true, 'Please add a sku'],
	},
	glamour: {
		type: String,
	},
	brand: {
		type: String,
	},
	features: {
		type: String,
	},
	psorted: {
		type: Number
	},
	extra_images: [{
		type: String,
	}],
	similar: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product'
	}],
	createdAt: {
		type: Date,
		default: Date.now,
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
	},
});

// create product slug from name
ProductSchema.pre('save', function (next) {
	this.slug = slugify(this.item_code, { lower: true });
	next();
});

module.exports = mongoose.model('Product', ProductSchema);
