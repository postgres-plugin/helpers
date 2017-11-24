'use strict';

var getTagsUsed = require('./getTagsUsed.js');
var getLocationsOrganisations = require('./getLocationsOrganisations.js');
var getLocationsChallenges = require('./getLocationsChallenges.js');
var getTagsOrganisations = require('./getTagsOrganisations.js');
var getTagsChallenges = require('./getTagsChallenges.js');

module.exports = {
  getTagsUsed: getTagsUsed,
  getLocationsOrganisations: getLocationsOrganisations,
  getLocationsChallenges: getLocationsChallenges,
  getTagsOrganisations: getTagsOrganisations,
  getTagsChallenges: getTagsChallenges
}
