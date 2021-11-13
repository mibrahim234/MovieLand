const { Router } = require('express');
const homeRoutes = require('./home-routes');

Router.use('/', homeRoutes);