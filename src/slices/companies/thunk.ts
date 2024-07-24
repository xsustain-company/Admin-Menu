import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Include Both Helper File with needed methods
import {
 
  addCategoryApi,getAttributsAPI,getCategoriesAPI,
  getCompanies, getOneCompanyApi,
  getOneProductApi,
  getProductsApi,
  getSubCategoriesAPI,
  updateProductApi
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


export const getProductss = createAsyncThunk("ecommerce/getProductss", async () => {
  try {
    const response = await getProductsApi();
    console.log(response);
    
    return response
  } catch (error:any) {
    return { error: error.message };
  }
});
export const getOneProductss = createAsyncThunk("ecommerce/getOneProductss", async (product:string) => {
  try {
    const response = await getOneProductApi(product);
    console.log(response);
    
    return response
  } catch (error:any) {
    return { error: error.message };
  }
});
export const updateProducte = createAsyncThunk("ecommerce/updateProduct", async (company:any) => {
  try {
    alert(company.id)
    const response = updateProductApi(company.formData , company.id);
    const data = await response;
    toast.success("Product Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("Company Added Failed", { autoClose: 3000 });
    return error;
  }
});


export const getCategoriess = createAsyncThunk("ecommerce/getCategoriess", async () => {
  try {
    const response = await getCategoriesAPI();
    console.log(response);
    
    return response
  } catch (error:any) {
    return { error: error.message };
  }
});

export const getAttributs = createAsyncThunk("ecommerce/getAttributs", async () => {
  try {
    const response = await getAttributsAPI();
    console.log(response);
    
    return response
  } catch (error:any) {
    return { error: error.message };
  }
});


export const getSubCategoriess = createAsyncThunk("ecommerce/getSubCategoriess", async () => {
  try {
    const response = await getSubCategoriesAPI();
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

export const getOneCompany = createAsyncThunk("ecommerce/getOneCompany", async (id:any) => {
  try {
    const response = await getOneCompanyApi(id);
    console.log(response);
    
    return response
  } catch (error:any) {
    return { error: error.message };
  }
});
