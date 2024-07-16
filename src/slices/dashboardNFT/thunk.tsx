import { createAsyncThunk } from "@reduxjs/toolkit";
//Include Both Helper File with needed methods
import {
  getAllMarketplaceData as getAllMarketplaceDataApi,
  getMonthMarketplaceData as getMonthMarketplaceDataApi,
  gethalfYearMarketplaceData as gethalfYearMarketplaceDataApi,
  getYearMarketplaceData as getYearMarketplaceDataApi
} from "../../helpers/fakebackend_helper";

export const getMarketChartsDatas = createAsyncThunk("dashboardNFT/getMarketChartsDatas", async (data:any) => {
  try {
    var response;
    if (data === "all") {
      response = getAllMarketplaceDataApi();
    }
    if (data === "month") {
      response = getMonthMarketplaceDataApi();
    }
    if (data === "halfyear") {
      response = gethalfYearMarketplaceDataApi();
    }
    if (data === "year") {
      response = getYearMarketplaceDataApi();
    }
    return response;
  } catch (error) {
    return error;
  }
});