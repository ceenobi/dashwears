import express from 'express'
import asyncHandler from 'express-async-handler'
import authorize from '../Middleware/Auth.js'
import Product from '../Models/ProductModel.js'

const productRoute = express.Router()

//Get all products
productRoute.get(
  '/',
  asyncHandler(async (req, res) => {
    const pageSize = 3
    const page = Number(req.query.pageNumber) || 1
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {}
    const count = await Product.countDocuments({...keyword})
    const products = await Product.find({ ...keyword})
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 })
    res.json({products, page, pages:Math.ceil(count/pageSize)})
  })
)
// productRoute.get(
//   '/',
//   asyncHandler(async (req, res) => {
//     const { searchQuery } = req.query
//     try {
//       const keyword = new RegExp(searchQuery, 'i')

//       const products = await Product.find({ $or: [{ ...keyword }] })

//       res.json({ data: products })
//     } catch (error) {
//       res.status(404)
//       throw new Error('Product not found')
//     }
//   })
// )

//get featured products
productRoute.get(
  '/featured',
  asyncHandler(async (req, res) => {
    const productFeature = await Product.find({ isFeatured: true }) 
    if (productFeature) {
      res.json(productFeature)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })
)

//Get single product
productRoute.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
      res.json(product)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })
)

//add saved product
// productRoute.post(
//   '/wishlist',
//   authorize,
//   asyncHandler(async (req, res) => {
//     const product = await Product.findById(req.params.id)
//     if (product) {
//       res.json(product)
//     } else {
//       res.status(404)
//       throw new Error('Product not found')
//     }
//   })
// )


//Get reviews
productRoute.post(
  '/:id/review',
  authorize,
  asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
    const product = await Product.findById(req.params.id)
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      )
      if (alreadyReviewed) {
        res.status(400)
        throw new Error('Product already reviewed')
      }
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      }
      product.reviews.push(review)
      product.numReviews = product.reviews.length
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length

      await product.save()
      res.status(201).json({ message: 'Review added successfully' })
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })
)

export default productRoute
