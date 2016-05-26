import R from 'ramda';
import status from 'http-status';
import chai from 'chai';
const expect = chai.expect
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import chaiSubset from 'chai-subset';
chai.use(chaiSubset);

import {login} from './helpers';
import * as F from './fixtures';
import createServer from '../src/server';

/*!
 * Chai helper to check if a result is a valid result
 */
function validObjectHelper(chai, utils) {
  utils.addMethod(chai.Assertion.prototype, 'validResult', function (httpStatus = status.OK) {
    expect(this._obj.status).to.equal(httpStatus);
    expect(this._obj).to.have.property('headers');
    expect(this._obj.headers).to.have.property('content-type');
    expect(this._obj.headers['content-type']).to.include('application/json');
    const payload = this._obj.data;
    if (payload.hasOwnProperty('success')) expect(payload.success).to.be.true;
  });
}
chai.use(validObjectHelper);

/*!
 * Chai helper validate an LargeItem object
 */
function largeHelper(chai, utils) {
  utils.addMethod(chai.Assertion.prototype, 'LargeItem', function (large) {
    expect(this._obj).to.have.property('status');
    expect(this._obj).to.have.property('field1');
    if (large) expect(this._obj).to.containSubset(R.omit(['updatedAt', 'status', 'small', 'transactions'])(large));
  });
}
chai.use(largeHelper);

/*!
 * Chai helper validate an SmallItem object
 */
function smallHelper(chai, utils) {
  utils.addMethod(chai.Assertion.prototype, 'SmallItem', function (small) {
    expect(this._obj).to.have.property('optionalKey');
    expect(this._obj).to.have.property('someString');
    expect(this._obj).to.have.property('user');
    if (small) expect(this._obj).to.containSubset(R.omit(['updatedAt', 'createdAt'])(small));
  });
}
chai.use(smallHelper);

let app;

before(async function() {
  console.log('Before All');
  this.timeout(2000);

  app = await createServer();
  
  await F.reloadAll();
  
  const res = await login();
  expect(res.status).to.equal(status.OK);
  expect(res.data.success).to.equal(true);
  expect(res.data.token).to.exist;
});

after(() => {
  console.log('After All');
  app.close();
});
