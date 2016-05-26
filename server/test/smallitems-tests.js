import assert from 'assert';
import axios from 'axios';
import status from 'http-status';
import chai from 'chai';
const expect = chai.expect
import * as F from './fixtures'

import smallitems from '../src/models/SmallItems';

import {BASEURL, PUBLIC_API, API} from './helpers';

describe('/smallitems', function() {
  before(() => {
  });
 
  after(() => {
  });
 
  it('cannot access smallitem without authenticating', () => {
    const res = PUBLIC_API.get(`/smallitems/${F.standardSmall._id}`);
    return expect(res).to.be.rejected.then(function(res) {
      expect(res.status).to.equal(status.UNAUTHORIZED);
    });
  });

  it('can get existing smallitem', async () => {
    const res = await API().get(`/smallitems/${F.standardSmall._id}`);
    expect(res).to.be.a.validResult();
    expect(res.data._id).to.eql(F.standardSmall._id);
  });

  it('cannot get non-existing smallitem', async () => {
    const res = API().get(`/smallitems/01234567890123456789`);
    return expect(res).to.be.rejected.then(function(res) {
      expect(res.status).to.equal(status.NOT_FOUND);
    });
  });

  it('can get existing smallitem by phone', async () => {
    const res = await API().get(`/smallitems?query={"optionalKey":${F.standardSmall.optionalKey}}`);
    expect(res).to.be.a.validResult();
    expect(res.data).to.be.a('array');
    expect(res.data).to.have.length(1);
    expect(res.data[0]._id).to.eql(F.standardSmall._id);
  });

  it('cannot get non-existing smallitem by optionalKey', async () => {
    const res = await API().get(`/smallitems?query={"optionalKey":12345678}`);
    expect(res).to.be.a.validResult();
    expect(res.data).to.be.empty;
  });

  it('can create new smallitem', async () => {
    const res = await API().post(`/smallitems`, F.newSmall);
    expect(res).to.be.a.validResult(status.CREATED);
    expect(res.data).to.containSubset(F.newSmall);
  });

  it('cannot create smallitem with duplicate id', () => {
    const res = API().post(`/smallitems`, Object.assign({}, F.newSmall, {_id: F.standardSmall._id}));
    return expect(res).to.be.rejected.then(function(res) {
      expect(res.status).to.equal(status.BAD_REQUEST);
    });
  });

  it('can update smallitem', async () => {
    const optionalKey = '98765432'
    const res = await API().put(`/smallitems/${F.standardSmall._id}`, { optionalKey });
    expect(res).to.be.a.validResult();
    expect(res.data.optionalKey).to.equal(optionalKey);
  });

  it('can list smallitems', async () => {
    const res = await API().get(`/smallitems`);
    expect(res).to.be.a.validResult();
    expect(res.data).to.be.a('array');
    expect(res.data).to.have.length.of.at.least(F.smallitems_fixture.smallitems.length);
  });

});
