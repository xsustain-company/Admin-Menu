import { createSlice } from "@reduxjs/toolkit";
import { getMailDetails, unreadMail, staredMail, labelMail, trashMail, deleteMail } from './thunk';

export const initialState: any = {
  mailDetails: [],
  error: {},
  isLoader: false
};

const MailBoxSlice = createSlice({
  name: 'MailBoxSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMailDetails.fulfilled, (state: any, action: any) => {
      state.mailDetails = action.payload;
      state.isLoader = false;
    });
    builder.addCase(getMailDetails.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
      state.isLoader = true;
    });

    builder.addCase(unreadMail.fulfilled, (state: any, action: any) => {
      state.mailDetails = state.mailDetails.map((mail: any) => {
        if (mail.forId === action.payload) {
          const updatedMail = mail.unread === true ? false : true;
          return { ...mail, unread: updatedMail };
        }
        return mail;
      });
      state.isMailDetailsDeleted = false;
    });

    builder.addCase(unreadMail.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
      state.isMailDetailsDeleted = false;
    });

    builder.addCase(trashMail.fulfilled, (state: any, action: any) => {

      state.mailDetails = state.mailDetails.map((mail: any) => {
        if (mail.forId === action.payload) {
          return { ...mail, category: "trash" };
        }
        return mail;
      });

      state.isMailDetailsDeleted = false;
    });

    builder.addCase(trashMail.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
      state.isMailDetailsDeleted = false;
    });

    builder.addCase(staredMail.fulfilled, (state: any, action: any) => {

      state.mailDetails = state.mailDetails.map((mail: any) => {
        if (mail.forId === action.payload) {
          const newCategory = mail.category === "starred" ? "inbox" : "starred";
          return { ...mail, category: newCategory };
        }
        return mail;
      });

      state.isMailDetailsDeleted = false;
    });

    builder.addCase(staredMail.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
      state.isMailDetailsDeleted = false;
    });

    builder.addCase(labelMail.fulfilled, (state: any, action: any) => {
      state.mailDetails = state.mailDetails.map((mail: any) => {
        if (mail.forId === action.payload.response) {
          return { ...mail, label: action.payload.label };
        }
        return mail;
      });

      state.isMailDetailsDeleted = false;
    });

    builder.addCase(labelMail.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
      state.isMailDetailsDeleted = false;
    });

    builder.addCase(deleteMail.fulfilled, (state: any, action: any) => {
      state.mailDetails = state.mailDetails.filter(
        (mail: any) => mail.forId !== action.payload
      );
      state.isMailDetailsDeleted = false;
    });

    builder.addCase(deleteMail.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
      state.isMailDetailsDeleted = false;
    });
  }
});

export default MailBoxSlice.reducer;