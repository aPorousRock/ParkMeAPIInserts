const conf = require('config');
const request = require('request');

var executeSolrUpdateQuery = function (query, collection, aggregationMode, parameters, callback) {

  const url = conf.SOLR_HOST + ":" + conf.SOLR_PORT + "/solr/" + "Alerts5" + "/update";
  var field = parameters.property;
  var formData = [
    {
      "id": parameters.id,
      [field]: {
        "set": parameters.value
      }
    }
  ];

  var options = {
    method: 'POST',
    url: url,
    json: formData,
  }

  request(options, function (err, httpResponse, body) {
    
    if (err) {
      console.error('error posting json: ', err)

      callback(err, err);
    }

    callback(null, body);
  });
}

module.exports = executeSolrUpdateQuery;
