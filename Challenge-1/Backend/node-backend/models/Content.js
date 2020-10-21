const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
	title: {
		type: String,
	},
	path: {
		type: String,
	},
	banner: {
		type: String,
	},
	content:{
		type: mongoose.Schema.Types.Mixed
	},
	filters:{
		type: [mongoose.Schema.Types.Mixed],
		default: undefined
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
	},
});

module.exports = mongoose.model('Content', ContentSchema);
