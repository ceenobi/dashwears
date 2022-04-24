import express from 'express'
import User from './Models/UserModel.js'
import Product from './Models/ProductModel.js'
import data from './data/Data.js'
import asyncHandler from 'express-async-handler'

const importData = express.Router()

importData.post(
  '/user',
  asyncHandler(async (req, res) => {
    await User.deleteMany({})
    const importUser = await User.insertMany(data.users)
    res.send({ importUser })
  })
)

importData.post(
  '/products',
  asyncHandler(async (req, res) => {
    await Product.deleteMany({})
    const importProducts = await Product.insertMany(data.products)
    res.send({ importProducts })
  })
)

export default importData
