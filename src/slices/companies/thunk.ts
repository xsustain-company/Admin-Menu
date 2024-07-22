import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Include Both Helper File with needed methods
import {
 
  addCategoryApi,
  getCompanies
} from "../../helpers/fakebackend_helper";

//--------------------------------

export const getCompaniess = createAsyncThunk("ecommerce/getCompaniess", async () => {
  try {
    const response = await getCompanies();
    console.log(response);
    
    return response
  } catch (error:any) {
    return { error: error.message };
  }
});

export const addCategories = createAsyncThunk("ecommerce/addCategory", async (data:any) => {
  try {
    const response = await addCategoryApi(data);
    console.log(response);
    
    return response
  } catch (error:any) {
    return { error: error.message };
  }
});
