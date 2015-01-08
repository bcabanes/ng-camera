var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname + '/app')).listen(3000);
