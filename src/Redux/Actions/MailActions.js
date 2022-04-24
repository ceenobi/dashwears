import * as api from '../../api/index.js'
import {MAIL_REGISTER_FAIL, MAIL_REGISTER_REQUEST, MAIL_REGISTER_SUCCESS, MAIL_SAVE_GENDER_METHOD } from '../Constants/actionTypes.js'

export const registerMail = (email, gender) => async (dispatch) => {
  try {
    dispatch({ type: MAIL_REGISTER_REQUEST })
    const { data } = await api.mailRegister({ email, gender })
    dispatch({ type: MAIL_REGISTER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: MAIL_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const saveGenderMethod = (data) => (dispatch) => {
  dispatch({
    type: MAIL_SAVE_GENDER_METHOD,
    payload: data,
  })
}
