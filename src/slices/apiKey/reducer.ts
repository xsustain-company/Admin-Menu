import { createSlice } from "@reduxjs/toolkit";
import { getAPIKey } from './thunk';

export const initialState :any= {
    apiKey: [],
    error: {},
};

const APIKeyslice = createSlice({
    name: 'APIKey',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAPIKey.fulfilled, (state:any, action:any) => {
            state.apiKey = action.payload;
        });
        builder.addCase(getAPIKey.rejected, (state:any, action:any) => {
            state.error = action.payload.error || null;
        });
    }
});

export default APIKeyslice.reducer;