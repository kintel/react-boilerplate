import HTTPStatus from 'http-status';
import api, {getAuthHeaders} from './api';

function findById(id) {
  const params = {
    populate: 'small'
  };
  const req = api.one('largeitems', id);
  return req.get(params, getAuthHeaders()).then(res => res.body().data());
}

function findBySerial(serial) {
  const params = {
    query: JSON.stringify({serial}),
    populate: 'small'
  };
  const req = api.all('largeitems');
  return req.getAll(params, getAuthHeaders()).then(res => {
    const results = res.body();
    if (results.length === 1) return results[0].data();
    throw {statusCode: 404};
  }).catch(err => {
    if (err.response) err = err.response;
    const error = {
      statusCode: err.statusCode
    };
    if (err.data && err.data.message) error.message = err.data.message;
    else error.message = HTTPStatus[error.statusCode];

    throw error;
  });
}

export function findBySmall(small) {
  const params = {
    query: JSON.stringify({small}),
    populate: 'small'
  };
  const req = api.all('largeitems');
  return req.getAll(params, getAuthHeaders()).then(res => {
    const results = res.body();
    if (results.length === 1) return results[0].data();
    throw {statusCode: 404};
  }).catch(err => {
    if (err.response) err = err.response;
    const error = {
      statusCode: err.statusCode
    };
    if (err.data && err.data.message) error.message = err.data.message;
    else error.message = HTTPStatus[error.statusCode];

    throw error;
  });
}

/*!
 * Find an Large from ID, serial or associated Small number.
 * Will auto-populate an associated Small in the imei.small property
 */
export async function find(key) {
  let imei;
  if (key.length === 4) imei = await findBySerial(key);
  else if (key.length === 15) imei = await findById(key);
  else if (key.length === 20) imei = await findBySmall(key);
  else assert(false);
  return imei;
}

/*!
 * We're not allowed to update an Large directly. All updated need to go through a transaction.
 * We thus POST our changes and let the backend deal with creating transactions.
 */
export function edit(imei_id, changes) {
  const params = {
    populate: 'small'
  };
  const req = api.one('largeitems', imei_id).custom('edit');
  return req.post(changes, params, getAuthHeaders()).then(res => res.body().data());
}

/*!
 * Payload must include a small
 */
export function install_small(imei, payload) {
  const params = {
    populate: 'small'
  };
  const req = api.one('largeitems', imei._id).custom('install_small');
  return req.post(payload, params, getAuthHeaders()).then(res => res.body().data());
}

/*!
 * 
 */
export function flash(imei) {
  const params = {
    populate: 'small'
  };
  const req = api.one('largeitems', imei._id).custom('flash');
  return req.post({}, params, getAuthHeaders()).then(res => res.body().data());
}

export function verify(imei) {
  const params = {
    populate: 'small'
  };
  const req = api.one('largeitems', imei._id).custom('verify');
  return req.post({}, params, getAuthHeaders()).then(res => res.body().data());
}

export function failVerification(imei, reason) {
  const params = {
    populate: 'small'
  };
  const req = api.one('largeitems', imei._id).custom('fail_verification');
  return req.post({reason}, params, getAuthHeaders()).then(res => res.body().data());
}

export function ship(imei_id, shipment_id, location) {
  const payload = {
    shipment: shipment_id,
    location
  };
  const params = {
    populate: 'small'
  };
  const req = api.one('largeitems', imei_id).custom('ship');
  return req.post(payload, params, getAuthHeaders()).then(res => res.body().data());
}

/*!
 * Find all Large items with the given status
 * Will auto-populate an associated Small in the imei.small property
 */
export function findByStatus(status) {
  if (!Array.isArray(status)) status = [status];
  const params = {
    query: JSON.stringify({status: {$in: status}}),
    sort: '-updatedAt',
    populate: 'small'
  };
  const req = api.all('largeitems');
  return req.getAll(params, getAuthHeaders()).then(res => res.body(false));
}
