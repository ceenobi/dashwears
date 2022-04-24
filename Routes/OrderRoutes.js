import express from 'express'
import asyncHandler from 'express-async-handler'
import authorize from '../Middleware/Auth.js'
import Order from '../Models/OrderModel.js'

const orderRoute = express.Router()
//create order
orderRoute.post(
  '/',
  authorize,
  asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingDetails,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body
    if (orderItems && orderItems.length === 0) {
      res.status(400)
      throw new Error('No order item')
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingDetails,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      })
      const createOrder = await order.save()
      res.status(201).json(createOrder)
    }
  })
)
//get order by id
orderRoute.get(
  '/:id',
  authorize,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    )
    if (order) {
      res.json(order)
      return
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  })
)
//order is paid
orderRoute.put(
  '/:id/pay',
  authorize,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      }
      const updatedOrder = await order.save()
      res.json(updatedOrder)
      res.send({ message: 'order paid' })
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  })
)

//user orders
orderRoute.get(
  '/',
  authorize,
  asyncHandler(async (req, res) => {
    const order = await Order.find({ user: req.user._id }).sort({ _id: -1 })
    res.json(order)
  })
)

export default orderRoute
