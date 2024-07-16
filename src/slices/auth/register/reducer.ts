import { createSlice } from "@reduxjs/toolkit";

export const initialState :any= {
  registrationError: null,
  message: null,
  loading: false,
  user: null,
  success: false,
  error: false
};

const registerSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    registerUserSuccessful(state:any, action:any) {
      state.user = action.payload;
      state.loading = false;
      state.success = true;
      state.registrationError = null;
    },
    registerUserFailed(state, action) {
      state.user = null;
      state.loading = false;
      state.registrationError = action.payload;
      state.error = true;
    },
    resetRegisterFlagChange(state) {
      state.success = false;
      state.error = false;
    },
    apiErrorChange(state:any, action:any){
      state.error = action.payload;
      state.loading = false;
      state.isUserLogout = false;
    }
  }
});

export const {
  registerUserSuccessful,
  registerUserFailed,
  resetRegisterFlagChange,
  apiErrorChange
} = registerSlice.actions;

export default registerSlice.reducer;