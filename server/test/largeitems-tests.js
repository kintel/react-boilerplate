import assert from 'assert';
import axios from 'axios';
import status from 'http-status';
import chai from 'chai';
const expect = chai.expect
import * as F from './fixtures'

import largeitems from '../src/models/LargeItems';

import {BASEURL, PUBLIC_API, API} from './helpers';

describe('/largeitems', function() {

  // Clear DB before all tests, to remove any side effects from other tests
  before(() => F.reloadAll());
 
  after(() => {
  });
 
  it('cannot access largeitem without authenticating', () => {
    const res = PUBLIC_API.get(`/largeitems/${F.standardLarge._id}`);
    return expect(res).to.be.rejected.then(function(res) {
      expect(res.status).to.equal(status.UNAUTHORIZED);
    });
  });

  it('can get existing largeitem', async () => {
    const res = await API().get(`/largeitems/${F.standardLarge._id}`);
    expect(res).to.be.a.validResult();
    expect(res.data).to.be.a.LargeItem(F.standardLarge);
  });

  it('cannot get non-existing largeitem', async () => {
    const res = API().get(`/largeitems/01234567890123456789`);
    return expect(res).to.be.rejected.then(function(res) {
      expect(res.status).to.equal(status.NOT_FOUND);
    });
  });

  it('can create new largeitem', async () => {
    const res = await API().post(`/largeitems`, F.newLarge);
    expect(res).to.be.a.validResult(status.CREATED);
    expect(res.data).to.be.a.LargeItem(F.newLarge);
  });

  it('cannot create largeitem with duplicate id', () => {
    const res = API().post(`/largeitems`, Object.assign({}, F.newLarge, {_id: F.standardLarge._id}));
    return expect(res).to.be.rejected.then(function(res) {
      expect(res.status).to.equal(status.BAD_REQUEST);
    });
  });

  it('can update largeitem', async () => {
    const field3 = 'Grønn'
    const res = await API().put(`/largeitems/${F.field3Large._id}`, { field3 });
    expect(res).to.be.a.validResult();
    expect(res.data.field3).to.equal(field3);
  });

  it('can list largeitems', async () => {
    const res = await API().get(`/largeitems`);
    expect(res).to.be.a.validResult();
    expect(res.data).to.be.a('array');
    expect(res.data).to.have.length.of.at.least(F.largeitems_fixture.largeitems.length);
  });

  it('can list largeitems filtered by status', async () => {
    const res = await API().get(`/largeitems?query=${JSON.stringify({status: 'sim_installed'})}`);
    expect(res).to.be.a.validResult();
    expect(res.data).to.be.a('array');
    expect(res.data).to.have.length(1);
  });

  it('can list largeitems filtered by multiple statuses', async () => {
    const res = await API().get(`/largeitems?query=${JSON.stringify({status: {$in: ['flashed', 'sim_installed']}})}`);
    expect(res).to.be.a.validResult();
    expect(res.data).to.be.a('array');
    expect(res.data).to.have.length(2);
  });

  it('can get by small id', async () => {
    const res = await API().get(`/largeitems?query={"small":"${F.installedSmall._id}"}`);
    expect(res).to.be.a.validResult();
    expect(res.data).to.be.a('array');
    expect(res.data).to.have.length(1)
    expect(res.data[0].small).to.eql(F.installedSmall._id);
  });

  it('cannot get by non-connected small id', async () => {
    const res = await API().get(`/largeitems?query={"small":${F.standardSmall._id}}`);
    expect(res).to.be.a.validResult();
    expect(res.data).to.be.empty;
  });
});
