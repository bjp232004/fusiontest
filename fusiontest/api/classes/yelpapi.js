const https = require('https');
const querystring = require('querystring');
const Config = require('../../config');

const ApiOptions = {
    host: 'api.yelp.com',
    path: '',
    method: 'GET',
    headers: {
        'authorization': `Bearer ${Config.Yelp.API_KEY}`
    }
};


const callFusionApi = (callback) => {
    console.log('inside fusionapi', ApiOptions);
    https.get(ApiOptions, (resp) => {
    let data = '';
    
    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
        data += chunk;
    });
    
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        return callback(data);
       // console.log(JSON.stringify(data));
    });
    
    }).on("error", (err) => {
       
    console.log("Error: " + err.message);
    });
}

module.exports.callApi = callFusionApi;
module.exports.ApiOptions = ApiOptions;