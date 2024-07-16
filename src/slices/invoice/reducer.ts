import { createSlice } from "@reduxjs/toolkit";
import { getInvoices, addNewInvoice, updateInvoice, deleteInvoice } from './thunk';
export const initialState :any= {
  invoices: [],
  error: {},
};


const InvoiceSlice = createSlice({
  name: 'InvoiceSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getInvoices.fulfilled, (state:any, action:any) => {
      state.invoices = action.payload.data;
      state.isInvoiceCreated = false;
      state.isInvoiceSuccess = true;
    });
    builder.addCase(getInvoices.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
      state.isInvoiceCreated = false;
      state.isInvoiceSuccess = false;
    });
    builder.addCase(addNewInvoice.fulfilled, (state:any, action:any) => {
      state.invoices.push(action.payload);
      state.isInvoiceCreated = true;
    });
    builder.addCase(addNewInvoice.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
    });
    builder.addCase(updateInvoice.fulfilled, (state:any, action:any) => {
      state.invoices = state.invoices.map((invoice:any) =>
        invoice._id.toString() === action.payload.data._id.toString()
          ? { ...invoice, ...action.payload.data }
          : invoice
      );
    });
    builder.addCase(updateInvoice.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
    });
    builder.addCase(deleteInvoice.fulfilled, (state:any, action:any) => {
      state.invoices = state.invoices.filter(
        (invoice:any) => invoice._id.toString() !== action.payload.invoice.toString()
      );
    });
    builder.addCase(deleteInvoice.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
    });
  }
});

export default InvoiceSlice.reducer;