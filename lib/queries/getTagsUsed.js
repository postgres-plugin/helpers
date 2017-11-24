'use strict';

module.exports = [
    'SELECT DISTINCT',
    'tags_id,',
    'tags.name',
    'FROM tags_organisations',
    'JOIN tags on tags.id = tags_organisations.tags_id',
    'UNION',
    'SELECT DISTINCT',
    'tags_id,',
    'tags.name',
    'FROM tags_challenges',
    'JOIN tags on tags.id = tags_challenges.tags_id',
    'ORDER BY tags_id'
  ].join(' ');
