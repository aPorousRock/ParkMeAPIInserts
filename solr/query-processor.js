const conf = require('config');
const request = require('request');

var executeSolrQuery = function(query, collection, aggregationMode, callback) {

 const url = conf.SOLR_HOST + ":" + conf.SOLR_PORT + "/solr/" + collection + "/sql?aggregationMode=" + aggregationMode;
    const formData = {
      stmt: query
    };
    request.post({url:url, form: formData}, function (err, httpResponse, body) {
        if(err) {
          callback(err, null);
        }

        try {
          callback(null, JSON.parse(body));
        }
        catch(err) {
          console.log("Error");
          callback(err, null);
        }
   });
};


module.exports = executeSolrQuery;
