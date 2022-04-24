import axios from 'axios'

const API = axios.create({ baseURL: 'https://dashfits.herokuapp.com/' })

//product actions
export const singleProduct = (id) => API.get(`/products/${id}`)
export const fetchFeatProducts = () => API.get(`/products/featured`)
export const fetchProducts = (keyword, pageNumber) =>
  API.get(`/products?keyword=${keyword}&pageNumber=${pageNumber}`)
export const productReview =(productId, review, config) => API.post(`/products/${productId}/review`, review, config)

//user actions
export const userLogin = (email, password, config) => API.post(`/users/login`, email, password, config)
export const userRegister = (name, email, password, config) => API.post(`/users`, name, email, password, config)
export const userDetails = (id, config) => API.get(`/users/${id}`, config)
export const userDetailUpdate = (user, config) => API.put(`/users/profile`, user, config)
 
//cart action
export const addProduct = (id, qty) => API.get(`/products/${id}`, qty)

//order action
export const orderCreateId = (order, config) => API.post(`/orders`, order, config)
export const getOrderDetailsId = (id, config) => API.get(`/orders/${id}`, config)
export const orderPayId = (orderId, paymentResult, config) => API.put(`/orders/${orderId}/pay`, paymentResult, config)
export const orderHistoryId = (config) => API.get(`/orders`, config)

//mailinglist
export const mailRegister = (email, gender) => API.post(`/mailorder`, email, gender)

//get paypal button
export const orderPaypalButton = (config) => API.get(`/config/paypal`)