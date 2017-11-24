'use strict';

var Wreck = require('wreck');
var config = require('../config.js');

module.exports = {
  getTags: getTags,
  getTag: getTag,
  getLocations: getLocations,
  getLocation: getLocation,
  getTagGroups: getTagGroups,
  getCollections: getCollections,
  getAssets: getAssets,
  getContributor: getContributor,
  getContributors: getContributors,
};

function damApiGet(endpoint, cb) {
  Wreck.get(config.damApiUrl + endpoint, function (err, res, payload) {
      if (err) {
        return cb(err)
      }
    return cb(null, JSON.parse(payload.toString()));
  });
}

function getTags(cb) {
  damApiGet('/api/tags/', function(err, data) {

    return cb(err, data);
  })
}

function getTag(id, cb) {
  damApiGet('/api/tags/' + id + '/', function(err, data) {

    return cb(err, data);
  })
}

function getLocations (cb) {
  return damApiGet('/api/countries/', cb);
}

function getLocation (id, cb) {
  return damApiGet('/api/countries/' + id + '/', cb);
}

function getTagGroups (cb) {
  return damApiGet('/api/tag-groups/', cb);
}

function getCollections (cb) {
  return damApiGet('/api/collections/', cb);
}

function getAssets (cb) {
  return damApiGet('/api/assets/', cb);
}

function getContributor (id, cb) {
  return damApiGet('/api/contributors/' + id + '/', cb);
}

function getContributors (cb) {
  return damApiGet('/api/contributors/', cb);
}
