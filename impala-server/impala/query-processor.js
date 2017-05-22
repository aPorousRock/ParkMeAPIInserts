const impala = require('node-impala');
const conf = require('config');

const client = impala.createClient();

var executeQuery = function(querystring, callback) {

  // To be modified - hardcoded now
  // console.log(querystring);
  // querystring = "SELECT * FROM bfringe.ibm738683r LIMIT 10";
  try {
    client.connect({
      host: conf.IMPALA_HOST,
      port: conf.IMPALA_PORT,
      resultType: 'json-array'
    });
  }
  catch(err) {
    // console.log(err);
    callback(err, null);
  }

  // console.log(querystring);

  client.query(querystring)
  .then(result => {
    // console.log(result);
    callback(null, result);
  })
  .catch(err => {
    // console.log(err);
    callback(err, null);
  })
  .done(() => client.close().catch(err => {
    // console.log(err);
    callback(err, null);
  }));
};

module.exports = executeQuery;
