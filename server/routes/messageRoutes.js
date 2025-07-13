const express = require('express')
const router = express.Router()
const messageController = require('../controllers/messageController')

router.get('/', messageController.getMessages)
router.get('/private/:userId', messageController.getPrivateMessages)
router.post('/', messageController.createMessage)

module.exports = router