const conf = require('config');
const request = require('request');

var executeSolrUpdateQuery = function (id,property,propValue, collection, callback) {

   //const url = conf.SOLR_HOST + ":" + conf.SOLR_PORT + "/solr/" + collection + "/update";
   const url = "http://bfsolr201.innovate.ibm.com" + ":" + "8983" + "/solr/" + "Alerts5" + "/update";
  
  var formData = [
    {
      "id": id,
      [property]: {
        "set": propValue
      }
    }
  ];

  var options = {
    method: 'POST',
    url: url,
    json: formData,
  }

  request(options, function (err, httpResponse, body) {
    
    if (err || body["error"] != undefined) {
      console.error('error posting json: ', err)

      callback(err, "Error");
    }

    callback(null, "Success");
  });
}

module.exports = executeSolrUpdateQuery;
