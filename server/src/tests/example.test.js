import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import { expect } from 'chai';

chai.use(chaiHttp);

describe('API Tests', () => {
  it('should return API is running', (done) => {
    chai
      .request(server)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('API is running!');
        done();
      });
  });

  it('should return 404 for unknown route', (done) => {
    chai
      .request(server)
      .get('/unknown')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message', 'Resource not found - /unknown');
        done();
      });
  });
});
