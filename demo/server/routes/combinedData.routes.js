const express = require('express');
const { getUsersWithRoles } = require('../controllers/combinedData.controllers.js');

const router = express.Router();

// Define the route
router.get('/users-with-roles', getUsersWithRoles);

module.exports = router;