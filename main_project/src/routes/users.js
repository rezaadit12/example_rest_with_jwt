const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const {getAllUsers, createNewUser, updateUser, deleteUser} = require('../controller/users');

// READ - GET
router.get('/', verifyToken, getAllUsers);

// CREATE - POST
router.post('/', createNewUser);

// UPDATE - PATCH
router.patch('/:idUsers',updateUser);


// DELETE - DELETE
router.delete('/:idUsers', deleteUser);

module.exports = router;



