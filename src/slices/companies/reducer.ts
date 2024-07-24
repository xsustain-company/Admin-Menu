import { createSlice } from "@reduxjs/toolkit";
import { getCompaniess, getOneCompany , addCategories, getCategoriess, getSubCategoriess, getAttributs, getProductss, getOneProductss } from './thunk';
import { categories } from "common/data/jobLanding";
export const initialState :any= {
  companies:[],
  products: [],
  oneProduct: [],

  oneCompany:[],
  categories : [],
  attributs:[],
  subCategories:[],
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
    builder.addCase(addCategories.fulfilled, (state:any, action:any) => {
      console.log(action.payload);
      
     // state.companies = action.payload.data; 
    });

    builder.addCase(addCategories.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
    });


    
    builder.addCase(getOneCompany.fulfilled, (state:any, action:any) => {
      console.log(action.payload);
      
      state.oneCompany = action.payload.data; 
    });

    builder.addCase(getOneCompany.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
    });
    builder.addCase(getCategoriess.fulfilled, (state:any, action:any) => {
      console.log(action.payload);
      
      state.categories = action.payload.data; 
    });

    builder.addCase(getCategoriess.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(getSubCategoriess.fulfilled, (state:any, action:any) => {
      console.log(action.payload);
      
      state.subCategories = action.payload.data; 
    });

    builder.addCase(getSubCategoriess.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
    });


    builder.addCase(getAttributs.fulfilled, (state:any, action:any) => {
      console.log(action.payload);
      
      state.attributs = action.payload.data; 
    });

    builder.addCase(getAttributs.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
    });


    builder.addCase(getProductss.fulfilled, (state:any, action:any) => {
      console.log(action.payload);
      
      state.products = action.payload.data; 
    });

    builder.addCase(getProductss.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
    });
    builder.addCase(getOneProductss.fulfilled, (state:any, action:any) => {
      console.log(action.payload);
      
      state.oneProduct = action.payload.data; 
    });

    builder.addCase(getOneProductss.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
    });
    

    
    
    


  }
});

export default CompaniesSlice.reducer;