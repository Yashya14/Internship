const express = require('express');
const router = express.Router();
const {assignUserRole,getAllUserRoles,deleteAssignUserRole,editUserRole} = require('../controllers/assignUserRole.controllers.js');


router.post('/user-role', assignUserRole);
router.get('/user-role', getAllUserRoles);
router.delete('/user-role/:id', deleteAssignUserRole);
router.put('/user-role/:id', editUserRole);
// router.get('/user-role/:id', getSingleUserRole);

module.exports = router;
