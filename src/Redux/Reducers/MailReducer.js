import { MAIL_REGISTER_FAIL, MAIL_REGISTER_REQUEST, MAIL_REGISTER_SUCCESS } from "../Constants/actionTypes"

export const mailListReducer = (state = {}, action) => {
  switch (action.type) {
    case MAIL_REGISTER_REQUEST:
      return { loading: true }
    case MAIL_REGISTER_SUCCESS:
      return { loading: false, success: true, mailInfo: action.payload }
    case MAIL_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}