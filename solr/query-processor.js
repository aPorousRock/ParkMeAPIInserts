const conf = require('config');
const request = require('request');

var executeSolrQuery = function(query, callback) {
    // Generate post data

    const url = conf.SOLR_HOST + ":" + conf.SOLR_PORT + "/solr/col_test2/sql?aggregationMode=facet";

    const formData = {
      stmt: query
    };

    request.post({url:url, form: formData}, function (err, httpResponse, body) {
        if(err) {
          callback(err, null);
        }

        callback(null, JSON.parse(body));
   });
};

module.exports = executeSolrQuery;
