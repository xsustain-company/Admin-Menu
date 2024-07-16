import { createAsyncThunk } from "@reduxjs/toolkit";
//Include Both Helper File with needed methods
import {
  getAllRevenueData as getAllRevenueDataApi,
  getMonthRevenueData as getMonthRevenueDataApi,
  getHalfYearRevenueData as getHalfYearRevenueDataApi,
  getYearRevenueData as getYearRevenueDataApi
} from "../../helpers/fakebackend_helper";

export const getRevenueChartsData = createAsyncThunk("dashboardEcommerce/getRevenueChartsData", async (data:any) => {
  try {
    var response;
    if (data === "all") {
      response = getAllRevenueDataApi();
    }
    if (data === "month") {
      response = getMonthRevenueDataApi();
    }
    if (data === "halfyear") {
      response = getHalfYearRevenueDataApi();
    }
    if (data === "year") {
      response = getYearRevenueDataApi();
    }
    return response;
  } catch (error) {
    return error;
  }
});