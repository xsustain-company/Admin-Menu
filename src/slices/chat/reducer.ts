import { createSlice } from "@reduxjs/toolkit";
import { getDirectContact, getMessages, addMessage, deleteMessage } from './thunk';

export const initialState : any = {
  chats: [],
  messages: [],
  channels: [],
  error: {},
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getDirectContact.fulfilled, (state: any, action: any) => {
      state.chats = action.payload;
      state.loading = true
    });
    builder.addCase(getDirectContact.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(getMessages.fulfilled, (state: any, action: any) => {
      state.messages = action.payload;
      state.loading = true
    });
    builder.addCase(getMessages.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(addMessage.fulfilled, (state: any, action: any) => {
      state.messages.map((data: any) => data.usermessages.push(action.payload));
    });
    builder.addCase(addMessage.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(deleteMessage.fulfilled, (state: any, action: any) => {
      state.messages = (state.messages || []).map((data: any) => {
        const updateUserMsg = data.usermessages.filter((userMsg: any) => userMsg.id !== action.payload);
        return { ...data, usermessages: updateUserMsg }
      })
    });
    
    builder.addCase(deleteMessage.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
    });

  },
});

export default chatSlice.reducer;