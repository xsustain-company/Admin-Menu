import { createAsyncThunk } from "@reduxjs/toolkit";
//Include Both Helper File with needed methods
import {
  getAllProjectData as getAllProjectDataApi,
  getMonthProjectData as getMonthProjectDataApi,
  gethalfYearProjectData as gethalfYearProjectDataApi,
  getYearProjectData as getYearProjectDataApi,
  getAllProjectStatusData as getAllProjectStatusDataApi,
  getWeekProjectStatusData as getWeekProjectStatusDataApi,
  getMonthProjectStatusData as getMonthProjectStatusDataApi,
  getQuarterProjectStatusData as getQuarterProjectStatusDataApi
} from "../../helpers/fakebackend_helper";

export const getProjectChartsData = createAsyncThunk("dashboardProject/getProjectChartsData", async (data:any) => {
  try {
    var response;
    if (data === "all") {
      response = getAllProjectDataApi();
    }
    if (data === "month") {
      response = getMonthProjectDataApi();
    }
    if (data === "halfyear") {
      response = gethalfYearProjectDataApi();
    }
    if (data === "year") {
      response = getYearProjectDataApi();
    }
    return response;
  } catch (error) {
    return error;
  }
});

export const getProjectStatusChartsData = createAsyncThunk("dashboardProject/getProjectStatusChartsData", async (data:any) => {
  try {
    var response;
    if (data === "all") {
      response = getAllProjectStatusDataApi();
    }
    if (data === "week") {
      response = getWeekProjectStatusDataApi();
    }
    if (data === "month") {
      response = getMonthProjectStatusDataApi();
    }
    if (data === "quarter") {
      response = getQuarterProjectStatusDataApi();
    }
    return response;
  } catch (error) {
    return error;
  }
});