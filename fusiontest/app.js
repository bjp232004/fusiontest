const express = require('express');

const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const fusionRoutes = require('./api/routes/fusions');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', '*');

	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});

//Routes imported which should handle requests
app.use('/fusions', fusionRoutes);

//No routes found handler
app.use((req, res) => {
	const error = newError('Not Found');
	error.status(404);
	next(error);
});

//Error handler for all types of error
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

app.server = app.listen(port, () => {
	console.log('Running on port ' + port);
});

module.exports = app;