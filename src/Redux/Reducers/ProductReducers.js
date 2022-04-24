import {
  CREATE_REVIEW_FAIL,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_RESET,
  CREATE_REVIEW_SUCCESS,
  FETCH_ALL_FAIL,
  FETCH_ALL_REQUEST,
  FETCH_ALL_SUCCESS,
  FETCH_FEATURED_FAIL,
  FETCH_FEATURED_REQUEST,
  FETCH_FEATURED_SUCCESS,
  FETCH_SINGLE_FAIL,
  FETCH_SINGLE_REQUEST,
  FETCH_SINGLE_SUCCESS,
  SAVE_CLEAR_ITEM,
  SAVE_FAIL,
  SAVE_REQUEST,
  SAVE_SUCCESS,
} from '../Constants/actionTypes'

//Fetch all products
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case FETCH_ALL_REQUEST:
      return { loading: true, products: [] }
    case FETCH_ALL_SUCCESS:
      return {
        loading: false,
        pages: action.payload.pages,
        page: action.payload.page,
        products: action.payload.products,
      }
    case FETCH_ALL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
//fetch featured products
export const productFeaturedReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case FETCH_FEATURED_REQUEST:
      return { loading: true, products: [] }
    case FETCH_FEATURED_SUCCESS:
      return { loading: false, products: action.payload }
    case FETCH_FEATURED_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
//fetch search
// export const productSearchReducer = (state = {products: []}, action) => {
//     switch (action.type) {
//         case FETCH_SEARCH_REQUEST:
//         return {loading: true, products:[]}
//         case FETCH_SEARCH_SUCCESS:
//         return {loading: false, products: action.payload.products}
//         case FETCH_SEARCH_FAIL:
//         return {loading: false, error: action.payload}
//         default:
//             return state;
//     }
// }

//fetch single product
export const productSingleReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case FETCH_SINGLE_REQUEST:
      return { ...state, loading: true, product: [] }
    case FETCH_SINGLE_SUCCESS:
      return { loading: false, product: action.payload }
    case FETCH_SINGLE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
//product review
export const productCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_REVIEW_REQUEST:
      return { loading: true, product: [] }
    case CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

export const saveListReducer = (state = { saveItems: [] }, action) => {
  switch (action.type) {
    case SAVE_REQUEST:
      return { loading: true }
    case SAVE_SUCCESS:
      return { loading: false, saveItems: action.payload }
    case SAVE_FAIL:
      return { loading: false, error: action.payload }
      case SAVE_CLEAR_ITEM:
        return {saveItems: []}
    default:
      return state
  }
}
