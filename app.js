const express = require('express');
const routes = require('./routes/routes');
const cors = require('cors');
const app = express();
const bodyParser     = require('body-parser');

app.use(bodyParser.json({ extended: true }));
app.use(cors());
app.use(routes);

app.listen(8020,'0.0.0.0', function() {
  console.log("API Server running at port 8020");
});
