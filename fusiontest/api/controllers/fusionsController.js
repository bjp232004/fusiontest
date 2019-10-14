const Config = require('../../config');
const querystring = require('querystring');
const FusionApi = require('../classes/yelpapi');

function fusionsController() {
	const get = (req, res) => {
		searchRequest = {
			'limit': 5
		};

		const params = querystring.parse(req.url.replace(/^.*\?/, ''))

		if(params.term) {
			searchRequest.term = params.term;
		}

		if(params.location) {
			searchRequest.location = params.location;
		} else {
			searchRequest.location = 'Alpharetta';
		}

		var cnt = 0;
		FusionApi.ApiOptions.path = `/v3/businesses/search?${querystring.stringify(searchRequest)}`,
		FusionApi.callApi(function(response){
			const businessData = JSON.parse(response);
			for(const i in businessData.businesses ) {
				const item = businessData.businesses[i];
				FusionApi.ApiOptions.path = `/v3/businesses/${item.id}/reviews`;
				FusionApi.callApi(function(reviewres){
					const businessreview = JSON.parse(reviewres);
					businessData.businesses[i].reviews = businessreview.reviews;
					cnt += 1;
					if(businessData.businesses.length == cnt) {
						const finalData = formatData(businessData);
						res.send(JSON.stringify(finalData));
						res.end();
					}
				});
			}
		});
	}

	const formatData = (businessData) => {
		// console.log(businessData)
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