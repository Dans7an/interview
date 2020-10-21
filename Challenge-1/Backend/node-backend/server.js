const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

// Load env cars
dotenv.config({ path: './config/config.env' });

// connect to database
connectDB();

// Route files
const products = require('./routes/products');
const auth = require('./routes/auth');
const users = require('./routes/users');
const news = require('./routes/news');
const content = require('./routes/contents');
const filter = require('./routes/filters');
const contact = require('./routes/contact');
const priorities = require('./routes/priorities');

const app = express();

// Body Parser
app.use(express.json());

// cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// File uploading
app.use(fileUpload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

app.set('trust proxy', 1);

// Rate limiting
const limiter = rateLimit({
	windowMs: 10 * 60 * 5000, // 10 mins
	max: 1500,
});

app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// mount routers
app.use('/api/v1/contact', contact);
app.use('/api/v1/products', products);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/news', news);
app.use('/api/v1/content', content);
app.use('/api/v1/filter', filter);
app.use('/api/v1/priorities', priorities);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;
const HOST = 'localhost';

const server = app.listen(
	PORT,
	HOST,
	console.log(
		`API running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold
	)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`.red);
	// Close server & exit process
	server.close(() => process.exit(1));
});
