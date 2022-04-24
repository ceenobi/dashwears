import express from 'express'
import asyncHandler from 'express-async-handler'
import Mail from '../Models/MailListModel.js'

const mailRoute = express.Router()

mailRoute.post(
  '/',
  asyncHandler(async (req, res) => {
    const { email, gender } = req.body
    const mailExists = await Mail.findOne({ email })
    if (mailExists) {
      res.status(400)
      throw new Error('email already subscribed')
    }

    const user = await Mail.create({ email, gender })

    if (user) {
      res.status(201).json({
        _id: user._id,
        email: user.email,
        gender: user.gender,
      })
    } else {
      res.status(400)
      throw new Error('Invalid email data')
    }
  })
)

export default mailRoute
