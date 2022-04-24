// import {
//   SAVE_ADD_ITEM,
//   SAVE_CLEAR_ITEM,
//   SAVE_FAIL,
//   SAVE_REMOVE_ITEM,
//   SAVE_REQUEST,
//   SAVE_SUCCESS,
// } from '../Constants/actionTypes'

// export const saveProductReducer = (state = { saveItems: [] }, action) => {
//   switch (action.type) {
//     case SAVE_REQUEST:
//       const item = action.payload
//       const existItem = state.saveItems.find((x) => x.product === item.product)
//       if (existItem) {
//         return {
//           ...state,
//           saveItems: state.saveItems.map((x) =>
//             x.product === existItem.product ? item : x
//           ),
//         }
//       } else {
//         return {
//           ...state,
//           saveItems: [...state.saveItems, item],
//         }
//       }
//     default:
//       return state
//   }
// }