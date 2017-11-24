'use strict';

var config = require('./config.js');
var pg = require('pg');
var queries = require('./queries/index.js');
var client = new pg.Client(config.pg);

module.exports = function (cb) {
  client.connect();
  client.query(queries.getTagsOrganisations, (errOrgs, resOrgs) => {
    client.query(queries.getTagsChallenges, (errChallenges, resChallenges) => {
      var orgs = resOrgs.rows;
      var challenges = resChallenges.rows;

      client.end();

      return cb({organisations: orgs, challenges: challenges})
    })
  });
}
