const https = require('https')
const fetch = require('node-fetch');
const fs = require('fs');
const {
  buildClientSchema,
  introspectionQuery,
  printSchema,
} = require('graphql/utilities');

const agent = new https.Agent({
  rejectUnauthorized: false
});

module.exports = {
  fetchWithIntrospection: (url, config, callback) => {
    console.log('Fetching', url);
    fetch(url, {
      agent: config.unauthorised ? agent : undefined,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: introspectionQuery }),
    })
      .then(res => res.json())
      .then(schema => callback(null, schema))
      .catch(err => callback(err));
  },
};
