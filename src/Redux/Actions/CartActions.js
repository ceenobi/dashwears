import * as api from '../../api/index.js'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_DETAILS,
} from '../Constants/actionTypes'

//add to cart
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await api.addProduct(id, qty)
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      slug: data.slug,
      title: data.title,
      price: data.price,
      image: data.image,
      countInStock: data.countInStock,
      qty,
    },
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
//remove from cart
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
//save shipping details
export const saveShippingDetails = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_DETAILS,
    payload: data,
  })

  localStorage.setItem('shippingDetails', JSON.stringify(data))
}
//save payment method
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}
