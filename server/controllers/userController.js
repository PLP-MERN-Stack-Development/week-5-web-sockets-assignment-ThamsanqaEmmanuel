const User = require('../models/User')

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.id } })
      .select('-password')
      .sort({ status: -1, username: 1 })

    res.json(users)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

exports.getUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select('status lastSeen')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}