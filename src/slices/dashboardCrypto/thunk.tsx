import { createAsyncThunk } from "@reduxjs/toolkit";
//Include Both Helper File with needed methods
import {
  getBtcPortfolioData as getBtcPortfolioDataApi,
  getUsdPortfolioData as getUsdPortfolioDataApi,
  getEuroPortfolioData as getEuroPortfolioDataApi,
  getAllMarketData as getAllMarketDataApi,
  getYearMarketData as getYearMarketDataApi,
  getMonthMarketData as getMonthMarketDataApi,
  getWeekMarketData as getWeekMarketDataApi,
  getHourMarketData as getHourMarketDataApi
} from "../../helpers/fakebackend_helper";

export const getPortfolioChartsData = createAsyncThunk("dashboardCrypto/getPortfolioChartsData", async (data:any) => {
  try {
    var response;
    if (data === "btc") {
      response = getBtcPortfolioDataApi();
    }
    if (data === "usd") {
      response = getUsdPortfolioDataApi();
    }
    if (data === "euro") {
      response = getEuroPortfolioDataApi();
    }
    return response;
  } catch (error) {
    return error;
  }
});

export const getMarketChartsData = createAsyncThunk("dashboardCrypto/getMarketChartsData", async (data:any) => {
  try {
    var response;

    if (data === "all") {
      response = getAllMarketDataApi();
    }
    if (data === "year") {
      response = getYearMarketDataApi();
    }
    if (data === "month") {
      response = getMonthMarketDataApi();
    }
    if (data === "week") {
      response = getWeekMarketDataApi();
    }
    if (data === "hour") {
      response = getHourMarketDataApi();
    }
    return response;
  } catch (error) {
    return error;
  }
});