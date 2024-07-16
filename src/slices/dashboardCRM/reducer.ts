import { createSlice } from "@reduxjs/toolkit";
import { getBalanceChartsData, getDialChartsData, getSalesChartsData } from './thunk';
export const initialState :any= {
  balanceOverviewData: [],
  dialTypeData: [],
  salesForecastData: [],
  error: {}
};


const DashboardCRMSlice = createSlice({
  name: 'DashboardCRM',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBalanceChartsData.fulfilled, (state:any, action:any) => {
      state.balanceOverviewData = action.payload;
    });
    builder.addCase(getBalanceChartsData.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(getDialChartsData.fulfilled, (state:any, action:any) => {
      state.dialTypeData = action.payload;
    });
    builder.addCase(getDialChartsData.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(getSalesChartsData.fulfilled, (state:any, action:any) => {
      state.salesForecastData = action.payload;
    });
    builder.addCase(getSalesChartsData.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
    });

  }
});

export default DashboardCRMSlice.reducer;