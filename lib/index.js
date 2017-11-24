var getTagsAndLocations = require('./getTagsAndLocations.js');
var api = require('./api/api.js');

getTagsAndLocations(function(err, res) {
  var tagsApp = res.tags;
  var locationsApp = res.locations;
  api.getTags(function(err, tagsApi) {
    // match tags
    tagsApp.forEach(function(tagApp) {
      var found = tagsApi.find(function(tagApi) {
        return tagApi.name.toLowerCase() === tagApp.name.toLowerCase();
      });
      tagApp.tagApiId = found && found.id;
    });
    var tagsUndefined = tagsApp.filter(t => t.tagApiId === undefined);

    // locations old
    // [ { tags_id: 125, name: 'Belgium' },
    //   { tags_id: 126, name: 'Brazil' },
    //   { tags_id: 127, name: 'China' },
    //   { tags_id: 134, name: 'Mexico' },
    //   { tags_id: 135, name: 'Netherlands' },
    //   { tags_id: 144, name: 'United Kingdom' },
    //   { tags_id: 145, name: 'USA' } ];
    //
    var matchLocations = {
      125: 18, //Belgium
      126: 25, //Brazil
      127: 44, //China
      134: 139, //Mexico
      135: 151, //Netherlands
      144: 236, //United Kingdom
      145: 241 //USA
    }
  });
});
