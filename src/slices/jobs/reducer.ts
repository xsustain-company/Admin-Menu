import { createSlice } from "@reduxjs/toolkit";
import { getApplicationList, addNewJobApplicationList, updateJobApplicationList, deleteJobApplicationList, getCategoryList, addcategoryList, getCandidateList, addCandidate, updateCandidate, deleteCandidate, addCandidateGrid, getCandidateGrid } from './thunk';

export const initialState: any = {
    appList: [],
    error: {},
};

const Jobslice = createSlice({
    name: 'Jobs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getApplicationList.fulfilled, (state: any, action: any) => {
            state.appList = action.payload;
        });
        builder.addCase(getApplicationList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });
        builder.addCase(addNewJobApplicationList.fulfilled, (state: any, action: any) => {
            state.appList = [...state.appList, action.payload];
        });

        builder.addCase(addNewJobApplicationList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(updateJobApplicationList.fulfilled, (state: any, action: any) => {
            state.appList = state.appList.map((job: any) =>
                job.id.toString() === action.payload.id.toString()
                    ? { ...job, ...action.payload }
                    : job
            );
        });

        builder.addCase(updateJobApplicationList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(deleteJobApplicationList.fulfilled, (state: any, action: any) => {
            state.appList = state.appList.filter(
                (job: any) => job.id.toString() !== action.payload.toString()
            );
        });

        builder.addCase(deleteJobApplicationList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        // candidate list
        builder.addCase(getCandidateList.fulfilled, (state: any, action: any) => {
            state.candidatelist = action.payload;
            state.loading = true;
        });
        builder.addCase(getCandidateList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });
        builder.addCase(addCandidate.fulfilled, (state: any, action: any) => {
            state.candidatelist.unshift(action.payload);
        });
        builder.addCase(addCandidate.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });
        builder.addCase(updateCandidate.fulfilled, (state: any, action: any) => {
            state.candidatelist = state.candidatelist.map((candidate: any) =>
                candidate.id === action.payload.id
                    ? { ...candidate, ...action.payload }
                    : candidate
            )
        });
        builder.addCase(updateCandidate.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });
        builder.addCase(deleteCandidate.fulfilled, (state: any, action: any) => {
            state.candidatelist = (state.candidatelist || []).filter((candidate: any) => (candidate.id + "") !== (action.payload + ""));
        });
        builder.addCase(deleteCandidate.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        // candidate Grid
        builder.addCase(getCandidateGrid.fulfilled, (state: any, action: any) => {
            state.candidategrid = action.payload;
            state.loading = true;
        });
        builder.addCase(getCandidateGrid.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });
        builder.addCase(addCandidateGrid.fulfilled, (state: any, action: any) => {
            state.candidategrid.unshift(action.payload);
        });
        builder.addCase(addCandidateGrid.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        // Job categories
        builder.addCase(getCategoryList.fulfilled, (state:any, action:any) => {
            state.categoryList = action.payload;
        });
        builder.addCase(getCategoryList.rejected, (state:any, action:any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(addcategoryList.fulfilled, (state:any, action:any) => {
            state.categoryList.unshift(action.payload);
          });
          builder.addCase(addcategoryList.rejected, (state:any, action:any) => {
            state.error = action.payload.error || null;
          });
    }
});

export default Jobslice.reducer;