const express = require('express');
const IntegrationController = require('./app/controllers/IntegrationController');

const routes = express.Router();

routes.post('/integration', IntegrationController.store);
routes.get('/integration', IntegrationController.list);

module.exports = routes;
