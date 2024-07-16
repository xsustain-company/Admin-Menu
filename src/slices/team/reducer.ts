import { createSlice } from "@reduxjs/toolkit";
import { getTeamData, addTeamData, updateTeamData, deleteTeamData } from './thunk';
export const initialState :any= {
    teamData: [],
    error: {},
};

const TeamSlice = createSlice({
    name: 'TeamSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTeamData.fulfilled, (state:any, action:any) => {
            state.teamData = action.payload;
        });
        builder.addCase(getTeamData.rejected, (state:any, action:any) => {
            state.error = action.payload.error || null;
        });
        builder.addCase(addTeamData.fulfilled, (state:any, action:any) => {
            state.teamData.push(action.payload);
        });
        builder.addCase(addTeamData.rejected, (state:any, action:any) => {
            state.error = action.payload.error || null;
        });
        builder.addCase(updateTeamData.fulfilled, (state:any, action:any) => {
            state.teamData = state.teamData.map((team :any)=>
                team.id.toString() === action.payload.id.toString()
                    ? { ...team, ...action.payload }
                    : team
            );
        });
        builder.addCase(updateTeamData.rejected, (state:any, action:any) => {
            state.error = action.payload.error || null;
        });
        builder.addCase(deleteTeamData.fulfilled, (state:any, action:any) => {
            state.teamData = state.teamData.filter((team :any)=> (team.id + "") !== (action.payload + ""));
        });
        builder.addCase(deleteTeamData.rejected, (state:any, action:any) => {
            state.error = action.payload.error || null;
        });
    }
});

export default TeamSlice.reducer;