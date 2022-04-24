import express from 'express'
import asyncHandler from 'express-async-handler'
import generateToken from '../config/generateToken.js'
import authorize from '../Middleware/Auth.js'
import User from '../Models/UserModel.js'

const userRoute = express.Router()

//Login
userRoute.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createdAt: user.createdAt,
      })
    } else {
      res.status(401)
      throw new Error('Invalid Email or Password')
    }
  })
)

//Register
userRoute.post(
  '/',
  asyncHandler(async (req, res) => { 
    const { name, email, password } = req.body
    const userExists = await User.findOne({ email })
    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }

    const user = await User.create({ name, email, password })
    
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid User data')
    }
  })
)
//Profile
userRoute.get(
  '/profile',
  authorize,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })
)

//update user profiler
userRoute.put('/profile', authorize, asyncHandler(async (req, res)=> {
  const user = await User.findById(req.user.id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save()
     res.json({
       _id: updatedUser._id,
       name: updatedUser.name,
       email: updatedUser.email,
       isAdmin: updatedUser.isAdmin,
       createdAt: updatedUser.createdAt,
       token: generateToken(updatedUser._id),
     })
  } else {
    res.status(404)
    throw new Error('User profile not updated')
  }
}))

export default userRoute
