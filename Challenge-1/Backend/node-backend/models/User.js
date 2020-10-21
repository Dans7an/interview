const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserScema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			'Please add a valid email'
		]
	},
	role: {
		type: String,
		enum: ['user', 'publisher', 'admin'],
		default: 'user'
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		select: false
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
	createdAt: {
		type: Date,
		default: Date.now
	}
});

// encrypt user password with bcrypt
UserScema.pre('save', async function(next) {
	if (!this.isModified('password')) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserScema.methods.getSignedJwtToken = function() {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE
	});
};

// Match user entered password to hashed password in database
UserScema.methods.matchPassword = async function(enteredPassowrd) {
	return await bcrypt.compare(enteredPassowrd, this.password);
};

// Generate and has password token
UserScema.methods.getResetPasswordToken = function() {
	// Generate token
	const resetToken = crypto.randomBytes(20).toString('hex');

	// hash token and set to resetPasswordToken field
	this.resetPasswordToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	// Set expire
	this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

	return resetToken;
};

module.exports = mongoose.model('User', UserScema);
