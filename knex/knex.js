require('dotenv').config({path: '../.env'});

const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile.js');
module.exports = require('knex')(config);
