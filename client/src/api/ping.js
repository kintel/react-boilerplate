import api from './api';

export function ping() {
  const req = api.custom('ping');
  return req.get().then(res => res.body().data());
}
