'use strict';

require('env2')('.env');
var url = require('url');
var env = process.env
var params = url.parse(env.DATABASE_URL);
var auth = params.auth.split(':');

var config = {
  pg: {
    user: auth[0],
    password: auth[1],
    database: params.pathname.split('/')[1],
    host: params.hostname,
    port: params.port,
    ssl: true
  },
  damApiUrl: env.DAM_API_URL
};

module.exports = config;
