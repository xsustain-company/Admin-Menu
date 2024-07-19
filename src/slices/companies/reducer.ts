import { createSlice } from "@reduxjs/toolkit";
import { getCompaniess,  } from './thunk';
export const initialState :any= {
  companies:[],
  products: [],
  orders: [],
  sellers: [],
  customers: [],
  error: {},
};

const CompaniesSlice = createSlice({
  name: 'CompaniesSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    console.log(builder);
    
    builder.addCase(getCompaniess.fulfilled, (state:any, action:any) => {
      console.log(action.payload);
      
      state.companies = action.payload.data; 
    });

    builder.addCase(getCompaniess.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
    });



  }
});

export default CompaniesSlice.reducer;