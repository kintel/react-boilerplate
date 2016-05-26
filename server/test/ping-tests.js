import assert from 'assert';
import axios from 'axios';
import status from 'http-status';
import chai from 'chai';
const expect = chai.expect

import {BASEURL, API, PUBLIC_API} from './helpers';

describe('/ping', function() {
  let app;

  before(function() {
  });
 
  after(function() {
  });
 
  it('can ping', async () => {
    const res = await PUBLIC_API.get('/ping');
    expect(res).to.be.a.validResult();
    expect(res.data.message).to.equal('Public ping');
  });

  it('can not secure ping witout authentication', () => {
    const res = PUBLIC_API.get('/ping/secure');
    return expect(res).to.be.rejected.then(function(res) {
      expect(res.status).to.equal(status.UNAUTHORIZED);
      expect(res.data.success).to.equal(false);
    });
  });

  it('can secure ping', async () => {
    const res = await API().get('/ping/secure');
    expect(res).to.be.a.validResult();
    expect(res.data.message).to.equal('Authenticated ping');
  });
});
