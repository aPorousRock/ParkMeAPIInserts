const conf = require('config');
const request = require('request');

var executeSolrQuery = function(query, collection, aggregationMode, callback) {
    
 const url = conf.SOLR_HOST + ":" + conf.SOLR_PORT + "/solr/" + collection + "/sql?aggregationMode=" + aggregationMode;
    const formData = {
      stmt: query
    };
            app.render('form', function(err, html){
             if(err) return res.send(err);
             else    return res.send(html)             
         });
    request.post({url:url, form: formData}, function (err, httpResponse, body) {
        if(err) {
          callback(err, null);
        }

        callback(null, JSON.parse(body));
   });
};


module.exports = executeSolrQuery;
