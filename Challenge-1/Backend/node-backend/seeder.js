const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// load models
const Product = require('./models/Product');
const Story = require('./models/Story');
const News = require('./models/New');
const User = require('./models/User');
const Content = require('./models/Content');
const Filter = require('./models/Filter');

// connect to DB
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
});

// read json files
const products = JSON.parse(
	fs.readFileSync(`${__dirname}/_data/products.json`, 'utf-8')
);

const users = JSON.parse(
	fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);

const story = JSON.parse(
	fs.readFileSync(`${__dirname}/_data/story.json`, 'utf-8')
);

const filter = JSON.parse(
	fs.readFileSync(`${__dirname}/_data/filter.json`, 'utf-8')
);

const news = JSON.parse(
	fs.readFileSync(`${__dirname}/_data/news.json`, 'utf-8')
);

const content = JSON.parse(
	fs.readFileSync(`${__dirname}/_data/content.json`, 'utf-8')
);

// import into DB
const importData = async () => {
	try {
		await Product.create(products);
		await User.create(users);
		await Story.create(story);
		await News.create(news);
		await Content.create(content);
		await Filter.create(filter);
		console.log('Data Imported...'.green.inverse);
		process.exit();
	} catch (err) {
		console.error(err);
	}
};

// delete data
const deleteData = async () => {
	try {
		await User.deleteMany();
		await Product.deleteMany();
		await Story.deleteMany();
		await News.deleteMany();
		await Content.deleteMany();
		await Filter.deleteMany();
		console.log('Data Destroyed...'.red.inverse);
		process.exit();
	} catch (err) {
		console.error(err);
	}
};

if (process.argv[2] === '-i') {
	importData();
} else if (process.argv[2] === '-d') {
	deleteData();
}
