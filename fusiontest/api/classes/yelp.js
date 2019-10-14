'use strict';

const https = require('https');
const querystring = require('querystring');

class YelpClient {
  constructor(apiKey, options){
    this.apiKey = apiKey;
    this.options = {
			'limit': 5
		};
    
    if(typeof options !== 'undefined'){
      this.options = options;
    }
  }
  
  send(requestOptions){
    const combinedOptions = Object.assign({}, requestOptions.query, this.options);
		const data = JSON.stringify(combinedOptions);

		const options = {
				hostname: requestOptions.url + '?' + querystring.stringify(combinedOptions),
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': requestOptions.bearerToken
        }
    };
		
    //change to http for local testing
    var req = https.request(options,(res) => {
        res.setEncoding('utf8');

        var body = '';

        res.on('data', (chunk) => {
        	body = body + chunk;
        });

        res.on('end',() => {
					console.log(`Body : ${body}`);
					if (res.statusCode != 200) {
							console.log(`Api call failed with response code ${res.statusCode}`);
					} else {
							console.log('Success!');
							return res;
					}
        });

    });

    req.on('error',(e) => {
        console.log(`Error: ${e}`);
    });

    req.end();
  };

  getBusiness(parameters){
		
    // return this.send({
    //   url: 'https://api.yelp.com/v3/businesses/search',
    //   query: parameters,
    //   bearerToken: this.apiKey
    // });

		return {
			"total": 8228,
			"businesses": [{
				"rating": 4,
				"price": "$",
				"phone": "+14152520800",
				"id": "E8RJkjfdcwgtyoPMjQ_Olg",
				"alias": "four-barrel-coffee-san-francisco",
				"is_closed": false,
				"categories": [{
					"alias": "coffee",
					"title": "Coffee & Tea"
				}],
				"review_count": 1738,
				"name": "Four Barrel Coffee",
				"url": "https://www.yelp.com/biz/four-barrel-coffee-san-francisco",
				"coordinates": {
					"latitude": 37.7670169511878,
					"longitude": -122.42184275
				},
				"image_url": "http://s3-media2.fl.yelpcdn.com/bphoto/MmgtASP3l_t4tPCL1iAsCg/o.jpg",
				"location": {
					"city": "San Francisco",
					"country": "US",
					"address2": "",
					"address3": "",
					"state": "CA",
					"address1": "375 Valencia St",
					"zip_code": "94103"
				},
				"distance": 1604.23,
				"transactions": ["pickup", "delivery"]
			}, {
				"rating": 4,
				"price": "$",
				"phone": "+14152520800",
				"id": "E8RJkjfdcwgtyoPMjQ_Olg",
				"alias": "four-barrel-coffee-san-francisco",
				"is_closed": false,
				"categories": [{
					"alias": "coffee",
					"title": "Coffee & Tea"
				}],
				"review_count": 1738,
				"name": "Four Barrel Coffee",
				"url": "https://www.yelp.com/biz/four-barrel-coffee-san-francisco",
				"coordinates": {
					"latitude": 37.7670169511878,
					"longitude": -122.42184275
				},
				"image_url": "http://s3-media2.fl.yelpcdn.com/bphoto/MmgtASP3l_t4tPCL1iAsCg/o.jpg",
				"location": {
					"city": "San Francisco",
					"country": "US",
					"address2": "",
					"address3": "",
					"state": "CA",
					"address1": "375 Valencia St",
					"zip_code": "94103"
				},
				"distance": 1604.23,
				"transactions": ["pickup", "delivery"]
			}],
			"region": {
				"center": {
					"latitude": 37.767413217936834,
					"longitude": -122.42820739746094
				}
			}
		};
  }

  getBusinessReviews(businessId){
		return {
			"reviews": [
				{
					"id": "xAG4O7l-t1ubbwVAlPnDKg",
					"rating": 5,
					"user": {
						"id": "W8UK02IDdRS2GL_66fuq6w",
						"profile_url": "https://www.yelp.com/user_details?userid=W8UK02IDdRS2GL_66fuq6w",
						"image_url": "https://s3-media3.fl.yelpcdn.com/photo/iwoAD12zkONZxJ94ChAaMg/o.jpg",
						"name": "Ella A."
					},
					"text": "Went back again to this place since the last time i visited the bay area 5 months ago, and nothing has changed. Still the sketchy Mission, Still the cashier...",
					"time_created": "2016-08-29 00:41:13",
					"url": "https://www.yelp.com/biz/la-palma-mexicatessen-san-francisco?hrid=hp8hAJ-AnlpqxCCu7kyCWA&adjust_creative=0sidDfoTIHle5vvHEBvF0w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=0sidDfoTIHle5vvHEBvF0w"
				}
			],
			"total": 1,
			"possible_languages": ["en"]
		};

    // return this.send({
    //   url: `https://api.yelp.com/v3/businesses/${businessId}/reviews`,
    //   bearerToken: this.apiKey
    // });
  }
}

module.exports = YelpClient;
