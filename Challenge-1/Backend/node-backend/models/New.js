const mongoose = require('mongoose');

const NewSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Please add a name'],
		trim: true,
		maxlength: [100, 'Name can not be more than 50 characters']
	},
	content: {
		type: String
	},
	video: {
		type: String
	},
	image: {
		type: String
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	}
});

module.exports = mongoose.model('New', NewSchema);
