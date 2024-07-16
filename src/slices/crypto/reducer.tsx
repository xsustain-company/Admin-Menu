import { createSlice } from "@reduxjs/toolkit";
import { getTransationList, getOrderList } from './thunk';

export const initialState :any= {
    transationList: [],
    orderList: [],
};

const Cryptoslice = createSlice({
    name: 'Crypto',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTransationList.fulfilled, (state:any, action:any) => {
            state.transationList = action.payload;
        });
        builder.addCase(getTransationList.rejected, (state:any, action:any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(getOrderList.fulfilled, (state:any, action:any) => {
            state.orderList = action.payload;
        });
        builder.addCase(getOrderList.rejected, (state:any, action:any) => {
            state.error = action.payload.error || null;
        });
    }
});

export default Cryptoslice.reducer;