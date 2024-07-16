import { createSlice } from "@reduxjs/toolkit";
import { getProjectChartsData, getProjectStatusChartsData } from './thunk';

export const initialState:any = {
  projectData: [],
  projectStatusData: [],
  error: {}
};


const DashboardProjectSlice = createSlice({
  name: 'DashboardProject',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProjectChartsData.fulfilled, (state:any, action:any) => {
      state.projectData = action.payload;
    });
    builder.addCase(getProjectChartsData.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(getProjectStatusChartsData.fulfilled, (state:any, action:any) => {
      state.projectStatusData = action.payload;
    });
    builder.addCase(getProjectStatusChartsData.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
    });
  }
});

export default DashboardProjectSlice.reducer;