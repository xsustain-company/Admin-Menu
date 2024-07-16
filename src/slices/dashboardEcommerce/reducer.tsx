import { createSlice } from "@reduxjs/toolkit";
import { getRevenueChartsData } from './thunk';

export const initialState :any= {
  revenueData: [],
  error: {}
};

const DashboardEcommerceSlice = createSlice({
  name: 'DashboardEcommerce',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRevenueChartsData.fulfilled, (state:any, action:any) => {
      state.revenueData = action.payload;
    });
    builder.addCase(getRevenueChartsData.rejected, (state:any, action:any) => {
      state.error = action.error.message;
    });
  }
});

export default DashboardEcommerceSlice.reducer;