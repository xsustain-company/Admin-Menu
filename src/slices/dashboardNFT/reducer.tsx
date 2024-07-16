import { createSlice } from "@reduxjs/toolkit";
import { getMarketChartsDatas } from './thunk';
export const initialState :any= {
  marketplaceData: [],
  error: {}
};

const DashboardNFTSlice = createSlice({
  name: 'DashboardNFT',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMarketChartsDatas.fulfilled, (state:any, action:any) => {
      state.marketplaceData = action.payload;
    });

    builder.addCase(getMarketChartsDatas.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
    });
  }
});

export default DashboardNFTSlice.reducer;