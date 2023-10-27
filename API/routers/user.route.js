const express = require('express');

const controller = require('../controllers/user.controller');

const router = express.Router()

router.post('/create', controller.createUser)
router.get('/read', controller.readUser)
router.get('read/:id', controller.readUserById)
router.put('/update/:id', controller.updateUser)
router.delete('/delete/:id', controller.deleteUser)

module.exports = router;