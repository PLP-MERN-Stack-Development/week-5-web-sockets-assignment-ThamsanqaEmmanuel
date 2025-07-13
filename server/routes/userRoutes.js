const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/', userController.getUsers)
router.get('/:userId/status', userController.getUserStatus)

module.exports = router