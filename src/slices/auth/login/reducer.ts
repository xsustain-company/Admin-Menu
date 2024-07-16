import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  user: {},
  error: "", // for error message
  loading: false,
  isUserLogout: false,
  errorMsg: false, // for error
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginBegin(state, action) {
      state.loading = true;
    },
    apiError(state:any, action:any) {
      state.errorMsg = action.payload.data;
      state.error = action.payload.data;
      state.loading = true;
      state.isUserLogout = false;
    },
    loginSuccess(state, action) {
      state.user = action.payload
      state.loading = false;
      state.errorMsg = false;
    },
    logoutUserSuccess(state, action) {
      state.isUserLogout = true
    },
    reset_login_flag(state:any) {
      state.errorMsg = null
      state.loading = false;
      state.error = false;
    }
  },
});

export const {
  apiError,
  loginSuccess,
  logoutUserSuccess,
  reset_login_flag,
  loginBegin
} = loginSlice.actions

export default loginSlice.reducer;