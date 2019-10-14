require('should');

const request = require('supertest');
const fusionsController = require('../controllers/fusionsController');

const app = require('../../app.js');

const agent = request.agent(app);

describe('Fusion Get Test', () => {
	it('should allow get and return the result _it', (done) => {
		agent.get('/fusions')
			.send()
			.expect(200)
			.end((err, results) => {
				results.body.should.not.equal('true');
				// results.body.should.have.property('_id');
				done();
			});
	});

	afterEach((done) => {
		//do some activity
		done();
	});

	after((done) => {
		//do some activity
		app.server.close(done());
	});
})