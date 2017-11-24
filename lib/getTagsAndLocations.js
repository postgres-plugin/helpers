'use strict';

var config = require('./config.js');
var pg = require('pg');
var queries = require('./queries/index.js');
var client = new pg.Client(config.pg);

module.exports = function (cb) {
  client.connect();
  client.query(queries.getTagsUsed, (err, res) => {
    // tag id 124 is the first location tag (australia) 145 is the last with USA
    var all = res.rows;
    var tags = all.filter(t => t.tags_id < 124);
    var locations = all.filter(t => t.tags_id  >= 124);
    client.end();

    return cb(err, {tags: tags, locations: locations})
  });
}
