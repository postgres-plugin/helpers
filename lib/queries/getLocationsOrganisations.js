'use strict';

module.exports = [
    'SELECT',
    'tags_id,',
    'organisations_id',
    'FROM tags_organisations',
    'WHERE tags_id >= 124',
    'ORDER BY organisations_id'
  ].join(' ');
