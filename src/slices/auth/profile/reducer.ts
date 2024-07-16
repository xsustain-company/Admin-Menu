import { createSlice } from "@reduxjs/toolkit";

export const initialState :any= {
  error: "",
  success: "",
  user: {}
};

const ProfileSlice = createSlice({
  name: "Profile",
  initialState,
  reducers: { 
    profileSuccess(state:any, action:any) {
      state.success = action.payload.status;
      state.user = action.payload.data
    },
    profileError(state, action) {
        state.error = action.payload
    },
    editProfileChange(state:any){
      state = { ...state };
    },
    resetProfileFlagChange(state:any){
      state.success = null
    }
  },
});

export const {
    profileSuccess,
    profileError,
    editProfileChange,
    resetProfileFlagChange
} = ProfileSlice.actions

export default ProfileSlice.reducer;