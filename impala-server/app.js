const express = require('express');
const routes = require('./routes/routes');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(routes);

app.listen(5000, '0.0.0.0', function() {
  console.log("Server running");
});
