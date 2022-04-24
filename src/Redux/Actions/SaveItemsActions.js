// import axios from 'axios'
// import { SAVE_FAIL, SAVE_REMOVE_ITEM, SAVE_REQUEST, SAVE_SUCCESS } from '../Constants/actionTypes'
// import { logout } from './UserActions'

// //add products to wishlist
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
//     await axios.get(`/api/products/${id}`, config)
//     dispatch({ type: SAVE_SUCCESS })
//       localStorage.setItem(
//         'saveItems',
//         JSON.stringify(getState().saveBasket.saveItems)
//       )
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

// //remove saved products
// export const removeSavedProduct = (id) => (dispatch) => {
//   dispatch({
//     type: SAVE_REMOVE_ITEM,
//     payload: id,
//   })
// }
