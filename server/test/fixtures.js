import mongoose from 'mongoose';
import promisify from 'es6-promisify';
import fixtures from 'node-mongoose-fixtures';
const fixturesPromise = promisify(fixtures);
import SmallItems from '../src/models/SmallItems';
import LargeItems from '../src/models/LargeItems';

const ObjectId = mongoose.Types.ObjectId;

export const standardUser = {
  email: "dd@mailinator.com",
};

export const standardSmall = {
  _id: "89471000007534508998",
  someString: "2024",
  field1: "51846861",
  optionalKey: "22222222",
  field2: "Ball",
  field3: "Cat",
};

export const newSmall = {
  _id: "89471555557534508998",
  someString: "3723",
  field1: "57389234",
  optionalKey: "93847344",
  field2: "Sphere",
  field3: "Dog",
};

export const installedSmall = {_id:"89470000160404054521",optionalKey:"47992318",someString:"8529",field1:"42322974",field2:"Ball",field3:"Cat",createdAt:"2016-04-11T01:56",updatedAt:"2016-04-11T01:56"};

export const flashedSmall = {_id:"89470000160404054539",optionalKey:"47992450",someString:"1145",field1:"58469200",field2:"Ball",field3:"Cat",createdAt:"2016-04-11T01:56",updatedAt:"2016-04-11T01:56"};

export const verifiedSmall = {"_id":"89470000160404054612",optionalKey:"47992502",someString:"5061",field1:"97639010",field2:"Ball",field3:"Cat",createdAt:"2016-04-11T01:56",updatedAt:"2016-04-11T01:56"};

export const verificationFailedSmall = {"_id":"89470000160404054620",optionalKey:"47992504",someString:"6676",field1:"23785237",field2:"Ball",field3:"Cat",createdAt:"2016-04-11T01:56",updatedAt:"2016-04-11T01:56"};

export const shippedSmall = {_id:"89470000160404054547",optionalKey:"47992452",someString:"2759",field1:"74615426",field2:"Ball",field3:"Cat",createdAt:"2016-04-11T01:56",updatedAt:"2016-04-11T01:56"};

export const smallitems_fixture = {
  smallitems: [
    {"_id":"89470000160404054554",optionalKey:"47992489",someString:"4373",field1:"90761652",field2:"Ball",field3:"Cat",createdAt:"2016-04-11T01:56",updatedAt:"2016-04-11T01:56"},
    {"_id":"89470000160404054562",optionalKey:"47992492",someString:"5988",field1:"16907879",field2:"Ball",field3:"Cat",createdAt:"2016-04-11T01:56",updatedAt:"2016-04-11T01:56"},
    {"_id":"89470000160404054570",optionalKey:"47992493",someString:"7602",field1:"33054105",field2:"Ball",field3:"Cat",createdAt:"2016-04-11T01:56",updatedAt:"2016-04-11T01:56"},
    {"_id":"89470000160404054588",optionalKey:"47992495",someString:"9217",field1:"49200332",field2:"Ball",field3:"Cat",createdAt:"2016-04-11T01:56",updatedAt:"2016-04-11T01:56"},
    {"_id":"89470000160404054596",optionalKey:"47992498",someString:"1832",field1:"65346558",field2:"Ball",field3:"Cat",createdAt:"2016-04-11T01:56",updatedAt:"2016-04-11T01:56"},
    {"_id":"89470000160404054604",optionalKey:"47992499",someString:"3447",field1:"81492784",field2:"Ball",field3:"Cat",createdAt:"2016-04-11T01:56",updatedAt:"2016-04-11T01:56"},
    standardSmall,
    installedSmall,
    flashedSmall,
    verifiedSmall,
    verificationFailedSmall,
    shippedSmall,
  ]
};

export const standardLarge = {
  _id: "952784932352968",
  field1: "1449",
  status: "default",
  field2: "Flying",
  field3: "Grå"
};

export const newLarge = {
  _id: "952784938273368",
  field1: "1500",
  status: "default",
  field2: "iPhone 6",
  field3: "Rød"
};

export const field3Large = {
  _id:"352735067717624",
  field1:"0001",
  status: "default",
  field2:"Flying",
  field3:"Grå"
};

export const checkoutLarge = {
  _id: "852735000015945",
  field1: "2497",
  field2: "Flying",
  field3: "Rød",
  createdAt: "2016-04-01T00:58",
  updatedAt: "2016-04-10T10:05",
  small: "89470000008156536843",
  transactions: [ 
    { _id: ObjectId("570bd0069dce0dea2a590000"), type: "checkout", user: standardUser.email, timestamp: "2016-04-10T10:05"},
  ]
};

export const installedLarge = {
  _id: "852735000025945",
  field1: "2498",
  field2: "Flying",
  field3: "Grå",
  createdAt: "2016-04-01T00:58",
  updatedAt: "2016-04-10T10:23",
  small: installedSmall._id,
  status: "sim_installed",
  transactions: [ 
    { _id: ObjectId("570bd0069dce0dea2a590001"), type: "checkout", user: standardUser.email, timestamp: "2016-04-10T10:05"},
    { _id: ObjectId("570bd0069dce0dea2a590002"), type: "install_sim", user: standardUser.email, timestamp: "2016-04-10T10:23", payload: {small: installedSmall._id} },
  ]
};

export const flashedLarge = {
  _id: "852735000035945",
  field1: "2499",
  field2: "Flying",
  field3: "Grå",
  createdAt: "2016-04-01T00:58",
  updatedAt: "2016-04-10T10:34",
  small: flashedSmall._id,
  status: "flashed",
  transactions: [ 
    { _id: ObjectId("570bd0069dce0dea2a590003"), type: "checkout", user: standardUser.email, timestamp: "2016-04-10T10:05" },
    { _id: ObjectId("570bd0069dce0dea2a590004"), type: "install_sim", user: standardUser.email, timestamp: "2016-04-10T10:24", payload: {small: flashedSmall._id} },
    { _id: ObjectId("570bd0069dce0dea2a590005"), type: "flash", user: standardUser.email, timestamp: "2016-04-10T10:34", payload: {} },
  ]
};

export const verifiedLarge = {
  _id:"352735067717772",
  field1:"0011",
  field2:"Flying",
  field3:"Grå",
  createdAt:"2016-04-01T00:58:07.958Z",
  updatedAt:"2016-04-01T00:58:07.958Z",
  small: verifiedSmall._id,
  status: "verified",
  transactions: [ 
    { _id: ObjectId("570bd0069dce0dea2a590006"), type: "checkout", user: standardUser.email, timestamp: "2016-04-10T10:05"},
    { _id: ObjectId("570bd0069dce0dea2a590007"), type: "install_sim", user: standardUser.email, timestamp: "2016-04-10T10:24", payload: {small: flashedSmall._id} },
    { _id: ObjectId("570bd0069dce0dea2a590008"), type: "flash", user: standardUser.email, timestamp: "2016-04-10T10:34", payload: {} },
    { _id: ObjectId("570bd0069dce0dea2a590009"), type: "verify", user: standardUser.email, timestamp: "2016-04-10T11:34", payload: {} },
  ]
};

export const verificationFailedLarge = {
  _id:"352735067717780",
  field1:"0012",
  field2:"Flying",
  field3:"Grå",
  createdAt:"2016-04-01T00:58:07.958Z",
  updatedAt:"2016-04-01T00:58:07.958Z",
  small: verificationFailedSmall._id,
  status: "verification_failed",
  transactions: [ 
    { _id: ObjectId("570bd0069dce0dea2a590010"), type: "checkout", user: standardUser.email, timestamp: "2016-04-10T10:05"},
    { _id: ObjectId("570bd0069dce0dea2a590011"), type: "install_sim", user: standardUser.email, timestamp: "2016-04-10T10:24", payload: {small: flashedSmall._id} },
    { _id: ObjectId("570bd0069dce0dea2a590012"), type: "flash", user: standardUser.email, timestamp: "2016-04-10T10:34", payload: {} },
    { _id: ObjectId("570bd0069dce0dea2a590013"), type: "fail_verification", user: standardUser.email, timestamp: "2016-04-10T11:34", payload: {} },
  ]
};

export const armedLarge = {
  _id: "852735000045945",
  field1: "2500",
  field2: "Flying",
  field3: "Rød",
  createdAt: "2016-04-01T00:58",
  updatedAt: "2016-04-10T16:45",
  small: shippedSmall._id,
  status: "armed",
  transactions: [ 
    { _id: ObjectId("570bd0069dce0dea2a590014"), type: "checkout", user: standardUser.email, timestamp: "2016-04-10T10:06"},
    { _id: ObjectId("570bd0069dce0dea2a590015"), type: "install_sim", user: standardUser.email, timestamp: "2016-04-10T10:24", payload: {small: shippedSmall._id} },
    { _id: ObjectId("570bd0069dce0dea2a590016"), type: "flash", user: standardUser.email, timestamp: "2016-04-10T10:38", payload: {} },
    { _id: ObjectId("570bd0069dce0dea2a590017"), type: "ship", user: "user@example.com", timestamp: "2016-04-10T16:45"}
  ]
};

export const largeitems_fixture = {
  largeitems: [
    {_id:"352735067717673",field1:"0002",status:"default",field2:"Flying",field3:"Grå",createdAt:"2016-04-01T00:58:07.958Z",updatedAt:"2016-04-01T00:58:07.958Z"},
    {_id:"352735067717707",field1:"0003",status:"default",field2:"Flying",field3:"Grå",createdAt:"2016-04-01T00:58:07.958Z",updatedAt:"2016-04-01T00:58:07.958Z"},
    {_id:"352735067717608",field1:"0004",status:"default",field2:"Flying",field3:"Grå",createdAt:"2016-04-01T00:58:07.958Z",updatedAt:"2016-04-01T00:58:07.958Z"},
    {_id:"352735067717558",field1:"0005",status:"default",field2:"Flying",field3:"Grå",createdAt:"2016-04-01T00:58:07.958Z",updatedAt:"2016-04-01T00:58:07.958Z"},
    {_id:"352735067717541",field1:"0006",status:"default",field2:"Flying",field3:"Grå",createdAt:"2016-04-01T00:58:07.958Z",updatedAt:"2016-04-01T00:58:07.958Z"},
    {_id:"352735067643770",field1:"0007",status:"default",field2:"Flying",field3:"Grå",createdAt:"2016-04-01T00:58:07.958Z",updatedAt:"2016-04-01T00:58:07.958Z"},
    {_id:"352735067717715",field1:"0008",status:"default",field2:"Flying",field3:"Grå",createdAt:"2016-04-01T00:58:07.958Z",updatedAt:"2016-04-01T00:58:07.958Z"},
    {_id:"352735067717756",field1:"0009",status:"default",field2:"Flying",field3:"Grå",createdAt:"2016-04-01T00:58:07.958Z",updatedAt:"2016-04-01T00:58:07.958Z"},
    {_id:"352735067717764",field1:"0010",status:"default",field2:"Flying",field3:"Grå",createdAt:"2016-04-01T00:58:07.958Z",updatedAt:"2016-04-01T00:58:07.958Z"},
    standardLarge,
    field3Large,
    checkoutLarge,
    installedLarge,
    flashedLarge,
    verifiedLarge,
    verificationFailedLarge,
    armedLarge,
  ]
};

export function clear(model) {
  return model.collection.remove({});
}

export async function clearAll() {
  await clear(SmallItems);
  await clear(LargeItems);
}

export async function reloadAll() {
  await clearAll();
  await fixturesPromise(smallitems_fixture);
  await fixturesPromise(largeitems_fixture);
}

export { fixturesPromise as load };
