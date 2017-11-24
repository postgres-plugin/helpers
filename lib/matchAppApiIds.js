var getTagsAndLocations = require('./getTagsAndLocations.js');
var api = require('./api/api.js');

module.exports = function(cb) {
  getTagsAndLocations(function(err, res) {
    var tagsApp = res.tags;
    var locationsApp = res.locations;
    api.getTags(function(err, tagsApi) {
      var matchTags = {
        88: 335, //additive manufactoring
        121: 358, //platforms
        53: 297 //money
      };
      tagsApp.forEach(function(tagApp) {
        if (tagApp.tags_id == 88 || tagApp.tags_id == 121 || tagApp.tags_id == 53) {
          tagApp.tagApiId = matchTags[tagApp.tags_id];
        } else {
          var found = tagsApi.find(function(tagApi) {
            return tagApi.name.toLowerCase() === tagApp.name.toLowerCase();
          });
          tagApp.tagApiId = found && found.id;
        }
      });
      var tagsUndefined = tagsApp.filter(t => t.tagApiId === undefined);
      console.log('could not match the following tags',tagsUndefined);

      var matchLocations = {
        125: 18, //Belgium
        126: 25, //Brazil
        127: 44, //China
        134: 139, //Mexico
        135: 151, //Netherlands
        144: 236, //United Kingdom
        145: 241 //USA
      };
      locationsApp.forEach(function(loc) {
        loc.locApiId = matchLocations[loc.tags_id]
      });
      var locationsUndefined = locationsApp.filter(l => l.locApiId === undefined);
      console.log('could not match the following locations', locationsUndefined);

      return cb({tags: tagsApp, locations: locationsApp});
    });
  });
}
