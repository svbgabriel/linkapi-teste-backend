const express = require('express');
const IntegrationController = require('./app/controllers/IntegrationController');

const routes = express.Router();

routes.post('/integration', IntegrationController.store);

module.exports = routes;
