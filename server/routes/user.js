const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

// create, find, update, delete operations
router.get('/', userController.view);
router.post('/', userController.find);
router.get('/adduser', userController.userForm);
router.post('/adduser', userController.createUser);
router.get('/edituser/:id', userController.editForm);
router.post('/editUser/:id', userController.updateUser)
router.get('/viewuser/:id', userController.viewUserdetails)
router.get('/:id', userController.deleteUser);

module.exports = router;