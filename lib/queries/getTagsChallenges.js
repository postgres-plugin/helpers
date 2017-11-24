'use strict';

module.exports = [
    'SELECT',
    'tags_id,',
    'challenges_id',
    'FROM tags_challenges',
    'WHERE tags_id < 124',
    'ORDER BY challenges_id'
  ].join(' ');
