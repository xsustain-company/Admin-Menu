import { createSlice } from "@reduxjs/toolkit";
import { getContacts, getCompanies, getDeals, getLeads, addNewContact, updateContact, deleteContact, addNewCompanies, updateCompanies, deleteCompanies, addNewLead, updateLead, deleteLead } from './thunk';

export const initialState:any = {
  crmcontacts: [],
  companies: [],
  isLeadCreated : false,
  deals: [],
  leads: [],
  error: {}
};

const crmSlice = createSlice({
  name: "crm",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getContacts.fulfilled, (state:any, action:any) => {
      state.crmcontacts = action.payload;
      state.isContactCreated = false;
      state.isContactSuccess = true;
    });

    builder.addCase(getContacts.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
      state.isContactCreated = false;
      state.isContactSuccess = false;
    });

    builder.addCase(addNewContact.fulfilled, (state:any, action:any) => {
      state.crmcontacts.push(action.payload);
      state.isCompaniesCreated = true;
      state.isCompaniesAdd = true;
      state.isCompaniesAddFail = false;
    });

    builder.addCase(addNewContact.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
      state.isContactAdd = false;
      state.isContactAddFail = true;
    });

    builder.addCase(updateContact.fulfilled, (state:any, action:any)=> {
      state.crmcontacts = state.crmcontacts.map((contact:any) =>
        contact.id === action.payload.id
          ? { ...contact, ...action.payload }
          : contact
      );
      state.isCompaniesCreated = true;
      state.isCompaniesAdd = true;
      state.isCompaniesAddFail = false;
    });

    builder.addCase(updateContact.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
      state.isContactUpdate = false;
      state.isContactUpdateFail = true;
    });

    builder.addCase(deleteContact.fulfilled, (state:any, action:any) => {
      state.crmcontacts = (state.crmcontacts || []).filter((contact:any) => contact.id.toString() !== action.payload.contact.toString());
      state.isContactDelete = true;
      state.isContactDeleteFail = false;
    });

    builder.addCase(deleteContact.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
      state.isContactDelete = false;
      state.isContactDeleteFail = true;
    });

    builder.addCase(getCompanies.fulfilled,(state:any, action:any) => {
      state.companies = action.payload;
      state.isCompaniesCreated = false;
      state.isCompaniesSuccess = true;
    });

    builder.addCase(getCompanies.rejected, (state:any, action:any)=> {
      state.error = action.payload.error || null;
      state.isCompaniesCreated = false;
      state.isCompaniesSuccess = false;
    });

    builder.addCase(addNewCompanies.fulfilled, (state:any, action:any) => {
      state.companies.push(action.payload);
      state.isCompaniesCreated = false;
      state.isCompaniesSuccess = true;
    });

    builder.addCase(addNewCompanies.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
      state.isCompaniesCreated = false;
      state.isCompaniesSuccess = false;
    });


    builder.addCase(updateCompanies.fulfilled, (state:any, action:any) => {
      state.companies = state.companies.map((company:any) =>
        company.id === action.payload.id ? { ...company, ...action.payload } : company);
      state.isCompaniesUpdate = true;
      state.isCompaniesUpdateFail = false;
    });

    builder.addCase(updateCompanies.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
      state.isCompaniesUpdate = false;
      state.isCompaniesUpdateFail = true;
    });

    builder.addCase(deleteCompanies.fulfilled, (state:any, action:any) => {
      state.companies = state.companies.filter(
        (company:any) => company.id.toString() !== action.payload.companies.toString());
      state.isCompaniesDelete = true;
      state.isCompaniesDeleteFail = false;
    });

    builder.addCase(deleteCompanies.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
      state.isCompaniesDelete = false;
      state.isCompaniesDeleteFail = true;
    });

    builder.addCase(getDeals.fulfilled, (state:any, action:any) => {
      state.deals = action.payload;
    });

    builder.addCase(getDeals.rejected,(state:any, action:any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(getLeads.fulfilled, (state:any, action:any) => {
      state.leads = action.payload;
      state.isLeadCreated = false;
      state.isLeadsSuccess = true;
    });

    builder.addCase(getLeads.rejected,(state:any, action:any) => {
      state.error = action.payload.error || null;
      state.isLeadCreated = false;
      state.isLeadsSuccess = false;
    });

    builder.addCase(addNewLead.fulfilled,(state:any, action:any) => {
      state.leads.push(action.payload);
      state.isLeadCreated = true;
      state.isLeadsAdd = true;
      state.isLeadsAddFail = false;
    });

    builder.addCase(addNewLead.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
      state.isLeadsAdd = false;
      state.isLeadsAddFail = true;
    });

    builder.addCase(updateLead.fulfilled, (state:any, action:any) => {
      state.leads = state.leads.map((lead:any) =>
        lead.id === action.payload.id
          ? { ...lead, ...action.payload }
          : lead);
      state.isLeadsUpdate = true;
      state.isLeadsUpdateFail = false;
    });

    builder.addCase(updateLead.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
      state.isLeadsUpdate = false;
      state.isLeadsUpdateFail = true;
    });

    builder.addCase(deleteLead.fulfilled, (state:any, action:any) => {
      state.leads = state.leads.filter(
        (lead:any) => lead.id.toString() !== action.payload.leads.toString()
      );
      state.isLeadsDelete = true;
      state.isLeadsDeleteFail = false;
    });

    builder.addCase(deleteLead.rejected, (state:any, action:any)=> {
      state.error = action.payload.error || null;
      state.isLeadsDelete = false;
      state.isLeadsDeleteFail = true;
    });
  },
});

export default crmSlice.reducer;