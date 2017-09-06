const fetch = require('node-fetch');
const fs = require('fs');
const {
  buildClientSchema,
  introspectionQuery,
  printSchema
} = require('graphql/utilities');

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

module.exports = {
  fetchWithIntrospection: (url, headers, callback) => {
    console.log('Fetching', url);
    fetch(url, {
      method: 'POST',
      headers: Object.assign(defaultHeaders, headers),
      body: JSON.stringify({ query: introspectionQuery })
    })
      .then(res => res.json())
      .then(schemaa => callback(null, schemaa))
      .catch(err => callback(err));
  }
};
