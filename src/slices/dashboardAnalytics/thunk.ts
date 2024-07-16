import { createAsyncThunk } from "@reduxjs/toolkit";
//Include Both Helper File with needed methods
import {
  getAllData as getAllDataApi,
  getHalfYearlyData as getHalfYearlyDataApi,
  getMonthlyData as getMonthlyDataApi,
  getAllAudiencesMetricsData as getAllAudiencesMetricsDataApi,
  getMonthlyAudiencesMetricsData as getMonthlyAudiencesMetricsDataApi,
  getHalfYearlyAudiencesMetricsData as getHalfYearlyAudiencesMetricsDataApi,
  getYearlyAudiencesMetricsData as getYearlyAudiencesMetricsDataApi,
  getTodayDeviceData as getTodayDeviceDataApi,
  getLastWeekDeviceData as getLastWeekDeviceDataApi,
  getLastMonthDeviceData as getLastMonthDeviceDataApi,
  getCurrentYearDeviceData as getCurrentYearDeviceDataApi,
  getTodaySessionData as getTodaySessionDataApi,
  getLastWeekSessionData as getLastWeekSessionDataApi,
  getLastMonthSessionData as getLastMonthSessionDataApi,
  getCurrentYearSessionData as getCurrentYearSessionDataApi
} from "../../helpers/fakebackend_helper";

export const getAllData = createAsyncThunk("dashboardAnalytics/getAllData", async (data:any) => {
  try {
    var response;

    if (data === "all") {
      response = getAllDataApi();
    }
    if (data === "halfyearly") {
      response = getHalfYearlyDataApi();
    }
    if (data === "monthly") {
      response = getMonthlyDataApi();
    }

    return response;
  } catch (error) {
    return error;
  }
});

export const getAudiencesMetricsChartsData = createAsyncThunk("dashboardAnalytics/getAudiencesMetricsChartsData", async (data:any) => {
  try {
    var response;

    if (data === "all") {
      response = getAllAudiencesMetricsDataApi();
    }
    if (data === "monthly") {
      response = getMonthlyAudiencesMetricsDataApi();
    }
    if (data === "halfyearly") {
      response = getHalfYearlyAudiencesMetricsDataApi();
    }
    if (data === "yearly") {
      response = getYearlyAudiencesMetricsDataApi();
    }

    return response;
  } catch (error) {
    return error;
  }
});

export const getUserDeviceChartsData = createAsyncThunk("dashboardAnalytics/getUserDeviceChartsData", async (data:any) => {
  try {
    var response;
    if (data === "today") {
      response = getTodayDeviceDataApi();
    }
    if (data === "lastWeek") {
      response = getLastWeekDeviceDataApi();
    }
    if (data === "lastMonth") {
      response = getLastMonthDeviceDataApi();
    }
    if (data === "currentYear") {
      response = getCurrentYearDeviceDataApi();
    }

    return response;
  } catch (error) {
    return error;
  }
});

export const getAudiencesSessionsChartsData = createAsyncThunk("dashboardAnalytics/getAudiencesSessionsChartsData", async (data:any) => {
  try {
    var response;
    if (data === "today") {
      response = getTodaySessionDataApi();
    }
    if (data === "lastWeek") {
      response = getLastWeekSessionDataApi();
    }
    if (data === "lastMonth") {
      response = getLastMonthSessionDataApi();
    }
    if (data === "currentYear") {
      response = getCurrentYearSessionDataApi();
    }

    return response;
  } catch (error) {
    return error;
  }
});