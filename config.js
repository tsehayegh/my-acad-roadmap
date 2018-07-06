'use strict';
//Server side configuration
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/my-acad-roadmap';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-my-acad-roadmap';
exports.PORT = process.env.PORT || 8080;
exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN  || 'http://localhost:3000' ;

//User authentication
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';


