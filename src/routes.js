const express = require('express');
const IntegrationController = require('./app/controllers/IntegrationController');

const routes = express.Router();

routes.post('/sync', IntegrationController.sync);

module.exports = routes;
