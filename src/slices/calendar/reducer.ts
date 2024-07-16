import { createSlice } from "@reduxjs/toolkit";

import { getEvents, addNewEvent, updateEvent, deleteEvent, getCategories, getUpCommingEvent, resetCalendar } from './thunk';

export const initialState: any = {
  events: [],
  categories: [],
  upcommingevents: [],
  error: {}
};


const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEvents.fulfilled, (state: any, action: any) => {
      state.events = action.payload;
    });
    builder.addCase(getEvents.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(addNewEvent.fulfilled, (state: any, action: any) => {
      state.events.push(action.payload);
    });
    builder.addCase(addNewEvent.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(updateEvent.fulfilled, (state: any, action: any) => {
      state.events = (state.events || []).map((event: any) =>
        event.id.toString() === action.payload.id.toString()
          ? { ...event, ...action.payload }
          : event
      );
    });

    builder.addCase(updateEvent.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(deleteEvent.fulfilled, (state: any, action: any) => {
      state.events = state.events.filter(
        (event: any) => event.id.toString() !== action.payload.toString()
      );
    });
    builder.addCase(deleteEvent.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(getCategories.fulfilled, (state: any, action: any) => {
      state.categories = action.payload;
    });
    builder.addCase(getCategories.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(getUpCommingEvent.fulfilled, (state: any, action: any) => {
      state.upcommingevents = action.payload;
    });

    builder.addCase(getUpCommingEvent.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(resetCalendar.fulfilled, (state: any, action: any) => {
      var flag = action.payload.flag;
      var value = action.payload.value;
      var flags: any = {};
      flags[flag] = value;

      // state.flags = action.payload;
    });

    builder.addCase(resetCalendar.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
    });

  },
});

export default calendarSlice.reducer;