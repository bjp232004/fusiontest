const YelpClient = require('../classes/yelp');
const Config = require('../../config');

const yelpclient = new YelpClient(Config.Yelp.API_KEY);

function fusionsController() {
	const get = (req, res) => {

		searchRequest = {
			term: req.body.term,
			location: req.body.location
		};

		getBusiness(searchRequest)
			.then((row) => {
				return getBusinessReviews(row);
			})
			.then((row) => {
				row = formatData(row)
				return res.json(row);
			})
			.catch((e) => {
				return res.json({'error': e.message, 'status': '400', 'success': false});
			});
	}

	const getBusiness = async (searchRequest) => {
			const result = yelpclient.getBusiness(searchRequest);
			return result;
	}

	const getBusinessReviews = async (businessData) => {
		for( i in businessData.businesses) {
			var item = businessData.businesses[i];
			const reviewsData = await yelpclient.getBusinessReviews(item.id);
			businessData.businesses[i].reviews = reviewsData.reviews
		}

		return businessData;
	}

	const formatData = (businessData) => {
		finalresult = [];
		for( i in businessData.businesses) {
			item = businessData.businesses[i];
			data = {};
			data.name = item.name;
			data.street = item.location.address1;
			data.city = item.location.city;
			data.image_url = item.image_url;
			if (item.reviews.length > 0) {
				data.excerpt = item.reviews[0].text;
				data.person_name = item.reviews[0].user.name;
			}

			finalresult.push(data);
		}

		return finalresult;
	}

	return { get }
}

module.exports = fusionsController;