var config = require('./config'),
	mongoose = require('mongoose');

module.exports = function() {
	var db = mongoose.connect(config.db);
    //Models
    db.connection.on('connected', function(){
        console.log('MongoDB Connected');
    });
	db.connection.on('error', function() {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    }); 
	//require('../app/models/user.server.model');
	//require('../app/models/credentials.server.model');
	//require('../models/website.server.model');
	return db;
};  