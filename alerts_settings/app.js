// const express        = require('express');
// const MongoClient    = require('mongodb').MongoClient;
// //const assert = require('assert');
// const bodyParser     = require('body-parser');
// const db             = require('./config/db');
//
// const app            = express();
//
// const port = 8030;
//
// app.use(bodyParser.json({ extended: true }));
//
// MongoClient.connect(db.url, (err, database) => {
//   if (err) return console.log(err)
//   require('./app/routes')(app, database);
//
//   app.listen(port, () => {
//     console.log('We are live on ' + port);
//   });
// })
const express = require('express');
const routes = require('./routes/routes');
const cors = require('cors');
const app = express();
const bodyParser     = require('body-parser');

app.use(bodyParser.json({ extended: true }));
app.use(cors());
app.use(routes);

app.listen(8030,'0.0.0.0', function() {
  console.log("API Server running at port 8030");
});
