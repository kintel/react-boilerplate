import axios from 'axios';

export const BASEURL = 'http://localhost:7071/api/v1';

let token;
let api;
export const PUBLIC_API = axios.create({
  baseURL: BASEURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export function getToken() {
  return token;
}

export function API() {
  if (!api) {
    api = axios.create({
      baseURL: BASEURL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
  }
  return api;
}

export async function login() {
  const res = await PUBLIC_API.post(`${BASEURL}/login`, {
    login: "dd@mailinator.com",
    password: "abc123"
  });
  token = res.data.token;
  return res;
}
