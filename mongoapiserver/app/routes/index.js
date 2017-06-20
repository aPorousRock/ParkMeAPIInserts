
const noteRoutes = require('./my_routes');

module.exports = function(app, db,callback) {
  noteRoutes(app, db,callback);
  // Other route groups could go here, in the future
};
