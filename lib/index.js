var matchAppApi = require('./matchAppApiIds.js');
var getLocations = require('./getLocations.js');
var getTags = require('./getTags.js');
var fs = require('fs');

matchAppApi(function(data) {
  // create mapping of ids
  var mapLocations = {};
  data.locations.forEach(function(l) {
      mapLocations[l.tags_id] = l.locApiId;
  });

  var mapTags = {};
  data.tags.forEach(function(t) {
    mapTags[t.tags_id] = t.tagApiId;
  });

  getLocations(function(locations) {
    //insert location in organisations
    var valLocationOrg = locations.organisations.map(function(v) {

      return '(' + mapLocations[v.tags_id] + ',' + v.organisations_id + ')';
    }).join(', ');
    var insertLocationsOrganisation = "INSERT INTO locations_organisations (locations_id, organisations_id) VALUES ";
    insertLocationsOrganisation += valLocationOrg + ';';

    //insert locations in challenges
    var valLocationChal = locations.challenges.map(function(v) {

      return '(' + mapLocations[v.tags_id] + ',' + v.challenges_id + ')';
    }).join(', ');
    var insertLocationsChallenges = "INSERT INTO locations_challenges (locations_id, challenges_id) VALUES ";
    insertLocationsChallenges += valLocationChal + ';';

    // delete locations from organistaions and locations
    var deleteLocsInOrgs = 'DELETE FROM tags_organisations WHERE tags_id >= 124;';
    var deleteLocsInChals = 'DELETE FROM tags_challenges WHERE tags_id >= 124;';

    //delete elements from tags_organisations and tags_challenges before updateTagsOrg
    var truncateOrg = 'TRUNCATE TABLE tags_organisations;';
    var truncateChallenge = 'TRUNCATE TABLE tags_challenges;';

    getTags(function(tags) {
      //inserts tags orgs
      var insertTagsOrgs = 'INSERT INTO tags_organisations (tags_id, organisations_id) VALUES '
      var valtagsOrgs = tags.organisations.map(function(t) {
        return '(' + mapTags[t.tags_id] + ',' + t.organisations_id + ')';
      }).join(', ');
      insertTagsOrgs += valtagsOrgs + ';';

      //insert tags challenges_id
      var insertTagsChallenges = 'INSERT INTO tags_challenges (tags_id, challenges_id) VALUES '
      var valtagsChallenges = tags.challenges.map(function(t) {
        return '(' + mapTags[t.tags_id] + ',' + t.challenges_id + ')';
      }).join(', ');
      insertTagsChallenges += valtagsChallenges + ';';

      var queriesToRun = [
        insertLocationsOrganisation,
        insertLocationsChallenges,
        deleteLocsInOrgs,
        deleteLocsInChals,
        truncateOrg,
        truncateChallenge,
        insertTagsOrgs,
        insertTagsChallenges
      ];

      fs.writeFile('./lib/tmp/queries.sql', queriesToRun.join('\n'), function(err) {
        if (err) throw err;
        console.log('queries ready!');
      });

    })

  });


})
