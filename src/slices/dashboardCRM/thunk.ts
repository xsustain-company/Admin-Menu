import { createAsyncThunk } from "@reduxjs/toolkit";
//Include Both Helper File with needed methods
import {
  getTodayBalanceData as getTodayBalanceDataApi,
  getLastWeekBalanceData as getLastWeekBalanceDataApi,
  getLastMonthBalanceData as getLastMonthBalanceDataApi,
  getCurrentYearBalanceData as getCurrentYearBalanceDataApi,
  getTodayDealData as getTodayDealDataApi,
  getWeeklyDealData as getWeeklyDealDataApi,
  getMonthlyDealData as getMonthlyDealDataApi,
  getYearlyDealData as getYearlyDealDataApi,
  getOctSalesData as getOctSalesDataApi,
  getNovSalesData as getNovSalesDataApi,
  getDecSalesData as getDecSalesDataApi,
  getJanSalesData as getJanSalesDataApi
}
  from "../../helpers/fakebackend_helper";

export const getBalanceChartsData = createAsyncThunk("dashboardCrm/getBalanceChartsData", async (data:any) => {
  try {
    var response;
    if (data === "today") {
      response = getTodayBalanceDataApi();
    }
    if (data === "lastWeek") {
      response = getLastWeekBalanceDataApi();
    }
    if (data === "lastMonth") {
      response = getLastMonthBalanceDataApi();
    }
    if (data === "currentYear") {
      response = getCurrentYearBalanceDataApi();
    }
    return response;
  } catch (error) {
    return error;
  }
});

export const getDialChartsData = createAsyncThunk("dashboardCrm/getDialChartsData", async (data:any) => {
  try {
    var response;
    if (data === "today") {
      response = getTodayDealDataApi();
    }
    if (data === "weekly") {
      response = getWeeklyDealDataApi();
    }
    if (data === "monthly") {
      response = getMonthlyDealDataApi();
    }
    if (data === "yearly") {
      response = getYearlyDealDataApi();
    }
    return response;
  }
  catch (error) {
    return error;
  }
});

export const getSalesChartsData = createAsyncThunk("dashboardCrm/getSalesChartsData", async (data:any) => {
  try {
    var response;
    if (data === "oct") {
      response = getOctSalesDataApi();
    }
    if (data === "nov") {
      response = getNovSalesDataApi();
    }
    if (data === "dec") {
      response = getDecSalesDataApi();
    }
    if (data === "jan") {
      response = getJanSalesDataApi();
    }
    return response;
  }
  catch (error) {
    return response;
  }
});