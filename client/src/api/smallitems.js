import assert from 'assert';
import HTTPStatus from 'http-status';
import api, {getAuthHeaders} from './api';
import * as largeitems from './largeitems';

export function findById(id) {
  const smallreq = api.one('smallitems', id);
  return smallreq.get(null, getAuthHeaders()).then(res => res.body().data());
}

function findByOptionalKey(optionalKey) {
  const params = {
    query: JSON.stringify({optionalKey})
  };
  const smallreq = api.all('smallitems');
  return smallreq.getAll(params, getAuthHeaders()).then(res => {
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

function populateLarge(small) {
  // Performing a second lookup to potentially associate this Small with an Large
  // FIXME: We could probably do this server-side.
  return largeitems.findBySmall(small._id).then(large => {
    small.large = large;
    return small;
  }).catch(err => small);
}

/*!
 * Find a Small from ID or optionalKey
 * Will auto-populate an associated Large in the small.large property
 */
export async function find(key) {
  let small;
  if (key.length === 8) small = await findByOptionalKey(key);
  else if (key.length === 20) small = await findById(key);
  else assert(false);

  return populateLarge(small);
}

export async function save(small) {
  const req = api.one('smallitems', small._id);
  const savedsmall = await req.put(small, null, getAuthHeaders()).then(res => res.body().data());

  return populateLarge(small);
}
