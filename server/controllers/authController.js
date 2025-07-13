const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.login = async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.json({ token, user: { id: user._id, username: user.username } })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

exports.register = async (req, res) => {
  const { username, password } = req.body

  try {
    let user = await User.findOne({ username })
    if (user) {
      return res.status(400).json({ message: 'User already exists' })
    }

    user = new User({ username, password })
    await user.save()

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.status(201).json({ token, user: { id: user._id, username: user.username } })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}