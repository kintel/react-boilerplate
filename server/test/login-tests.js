import assert from 'assert';
import axios from 'axios';
import status from 'http-status';
import chai from 'chai';
import jwt from 'jsonwebtoken';
const expect = chai.expect

import {BASEURL, PUBLIC_API} from './helpers';

describe('/login', function() {
  before(function() {
  });
 
  after(function() {
  });
 
  it('can login', async () => {
    const res = await PUBLIC_API.post(`/login`, {
      login: "dd@mailinator.com",
      password: "abc123"
    });
    expect(res).to.be.a.validResult();
    expect(res.data.token).to.exist;

    const decoded = jwt.decode(res.data.token);
    expect(decoded).to.have.property('email');
  });

  it('will fail on wrong credentials', () => {
    const res = PUBLIC_API.post(`/login`, {
      login: "test@example.com",
      password: "abc123"
    });
    return expect(res).to.be.rejected.then(function(res) {
      expect(res.status).to.be.oneOf([status.UNAUTHORIZED, status.TOO_MANY_REQUESTS]);
    });
  });
});
