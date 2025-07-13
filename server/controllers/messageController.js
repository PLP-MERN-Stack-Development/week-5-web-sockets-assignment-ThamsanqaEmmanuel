const Message = require('../models/Message')

exports.getMessages = async (req, res) => {
  const { room, page = 1, limit = 20 } = req.query
  const skip = (page - 1) * limit

  try {
    const messages = await Message.find({ room })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('sender', 'username')

    const total = await Message.countDocuments({ room })

    res.json({
      messages,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page)
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

exports.getPrivateMessages = async (req, res) => {
  const { userId } = req.params
  const currentUserId = req.user.id
  const { page = 1, limit = 20 } = req.query
  const skip = (page - 1) * limit

  try {
    const messages = await Message.find({
      isPrivate: true,
      $or: [
        { sender: currentUserId, recipient: userId },
        { sender: userId, recipient: currentUserId }
      ]
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('sender', 'username')
      .populate('recipient', 'username')

    const total = await Message.countDocuments({
      isPrivate: true,
      $or: [
        { sender: currentUserId, recipient: userId },
        { sender: userId, recipient: currentUserId }
      ]
    })

    res.json({
      messages,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page)
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

exports.createMessage = async (req, res) => {
  const { content, room, recipient, isPrivate } = req.body

  try {
    const message = new Message({
      content,
      sender: req.user.id,
      recipient,
      room,
      isPrivate: isPrivate || false
    })

    await message.save()
    const populatedMessage = await Message.populate(message, [
      { path: 'sender', select: 'username' },
      { path: 'recipient', select: 'username' }
    ])

    res.status(201).json(populatedMessage)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}