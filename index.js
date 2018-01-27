var express = require('express')

var app = express()
app.set('views', __dirname)
// use whatever templating system(s) you like
app.set('view engine', 'pug')
 
// Load the routes ("controllers" -ish) 
app.use('/api', require('./app/api/customers/router')) 
// Repeat the above line for additional model areas ("deals", "vehicles", etc)

// FINALLY, use any error handlers
app.use(require('./app/api/errors/not-found'))

// Export the app instance for unit testing via supertest
module.exports = app
