const fetch = require('node-fetch');
const fs = require('fs');
const {
  buildClientSchema,
  introspectionQuery,
  printSchema,
} = require('graphql/utilities');

module.exports = {
  fetchWithIntrospection: (url, callback) => {
    console.log('Fetching', url);
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: introspectionQuery }),
    })
      .then(res => res.json())
      .then(schemaa => callback(null, schemaa))
      .catch(err => callback(err));
  },
};
