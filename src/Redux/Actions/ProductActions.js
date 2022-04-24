import {
  FETCH_ALL_FAIL,
  FETCH_ALL_REQUEST,
  FETCH_ALL_SUCCESS,
  FETCH_SINGLE_REQUEST,
  FETCH_SINGLE_SUCCESS,
  FETCH_SINGLE_FAIL,
  FETCH_FEATURED_REQUEST,
  FETCH_FEATURED_SUCCESS,
  FETCH_FEATURED_FAIL,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAIL,
  // SAVE_REQUEST,
  // SAVE_SUCCESS,
  // SAVE_FAIL,
} from '../Constants/actionTypes'
import { logout } from './UserActions'
import * as api from '../../api/index.js'

//fetch all product
export const getProducts =
  (keyword = ' ', pageNumber = ' ') =>
  async (dispatch) => {
    try {
      dispatch({ type: FETCH_ALL_REQUEST })
      const { data } = await api.fetchProducts(keyword, pageNumber)
      dispatch({ type: FETCH_ALL_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: FETCH_ALL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

//fetch featured product
export const getFeaturedProducts = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_FEATURED_REQUEST })
    const { data } = await api.fetchFeatProducts()
    dispatch({ type: FETCH_FEATURED_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: FETCH_FEATURED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//fetch single product
export const getProductId = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_SINGLE_REQUEST })
    const { data } = await api.singleProduct(id)
    dispatch({ type: FETCH_SINGLE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: FETCH_SINGLE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//product review create
export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_REVIEW_REQUEST })
      const {
        userLogin: { userInfo },
      } = getState()
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      await api.productReview(productId, review, config)
      dispatch({ type: CREATE_REVIEW_SUCCESS })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: CREATE_REVIEW_FAIL,
        payload: message,
      })
    }
  }

  // export const getProductsBySearch = (searchQuery) => async (dispatch) => {
//   try {
//     dispatch({ type: FETCH_SEARCH_REQUEST })
//     const { data: {data} } = await axios.get(
//       `/api/products?searchQuery=${searchQuery.keyword || 'none'}`
//     )
//     dispatch({ type: FETCH_SEARCH_SUCCESS, payload: data })
//   } catch (error) {
//     dispatch({
//       type: FETCH_SEARCH_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     })
//   }
// }

//savedwishlist
// export const getWishListId = (id) => async (dispatch, getState) => {
//   try {
//     dispatch({ type: SAVE_REQUEST })
//     const {
//       userLogin: { userInfo },
//     } = getState()
//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     }
//     const { data } = await axios.get(`/api/products/${id}`, config)
//     dispatch({ type: SAVE_SUCCESS, payload: data })
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message
//     if (message === 'Not authorized, token failed') {
//       dispatch(logout())
//     }
//     dispatch({
//       type: SAVE_FAIL,
//       payload: message,
//     })
//   }
// }
