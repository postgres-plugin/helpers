'use strict';

module.exports = [
    'SELECT DISTINCT',
    'tags_id,',
    'tags.name',
    'FROM tags_organisations',
    'JOIN tags on tags.id = tags_organisations.tags_id',
    'ORDER BY tags_id'
  ].join(' ');
