import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Include Both Helper File with needed methods
import {
 
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
