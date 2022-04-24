import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { cartReducer } from './Reducers/CartReducer'
import { mailListReducer } from './Reducers/MailReducer'
import {
  orderCreateReducer,
  orderDetailReducer,
  orderHistoryReducer,
  orderPayReducer,
} from './Reducers/OrderReducer'
import {
  productCreateReviewReducer,
  productFeaturedReducer,
  productListReducer,
  productSingleReducer,
  saveListReducer,
} from './Reducers/ProductReducers'
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from './Reducers/UserReducer'

const reducer = combineReducers({
  productList: productListReducer,
  productFeature: productFeaturedReducer,
  productDetail: productSingleReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailReducer,
  orderPay: orderPayReducer,
  orderHistory: orderHistoryReducer,
  productReview: productCreateReviewReducer,
  saveList: saveListReducer,
  mailClient: mailListReducer,
})
//cart details
const cartItemsFromLocalStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

//shipping details
const shippingDetailsFromLocalStorage = localStorage.getItem('shippingDetails')
  ? JSON.parse(localStorage.getItem('shippingDetails'))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
    shippingDetails: shippingDetailsFromLocalStorage,
  },
  userLogin: { userInfo: userInfoFromLocalStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
