import fetch from 'isomorphic-fetch';
import restful, { fetchBackend } from 'restful.js';

const APIBASE = '/api/v1';
export default restful(APIBASE, fetchBackend(fetch));

export function getAuthHeaders() {
  const token = localStorage.getItem('jwt');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  return headers;
}
