import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Include Both Helper File with needed methods
import {
  getMailDetails as getMailDetailsApi,
  deleteMail as deleteMailApi,
  trashMail as trashMailApi,
  staredMail as staredMailApi,
  unreadMail as unreadMailApi,
  labelMail as labelMailApi
} from "../../helpers/fakebackend_helper";

export const getMailDetails = createAsyncThunk("mailbox/getMailDetails", async () => {
  try {
    const response = getMailDetailsApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const unreadMail = createAsyncThunk("mailbox/unreadMail", async (mail: any) => {
  try {
    const response = unreadMailApi(mail);
    // toast.success("Mail Added Favorite Successfully", { autoClose: 3000 });
    return response;
  } catch (error) {
    // toast.error("Mail Added Favorite Failed", { autoClose: 3000 });
    return error;
  }
});

export const staredMail = createAsyncThunk("mailbox/staredMail", async (mail: any) => {
  try {
    const response = staredMailApi(mail);
    // toast.success("Mail Added Favorite Successfully", { autoClose: 3000 });
    return response;
  } catch (error) {
    // toast.error("Mail Added Favorite Failed", { autoClose: 3000 });
    return error;
  }
});

export const trashMail = createAsyncThunk("mailbox/trashMail", async (mail: any) => {
  try {
    const response = trashMailApi(mail);
    toast.success("Mail Moved Trash Successfully", { autoClose: 3000 });
    return response;
  } catch (error) {
    toast.error("Mail Moved Trash Failed", { autoClose: 3000 });
    return error;
  }
});

export const deleteMail = createAsyncThunk("mailbox/deleteMail", async (mail: any) => {
  try {
    const response = deleteMailApi(mail);
    toast.success("Mail Delete Successfully", { autoClose: 3000 });
    return response;
  } catch (error) {
    toast.error("Mail Delete Failed", { autoClose: 3000 });
    return error;
  }
});

export const labelMail = createAsyncThunk("mailbox/labelMail", async (mail: any) => {
  try {
    const data = labelMailApi(mail.forId);
    const response = await data;
    return { response: response, label: mail.e };
  } catch (error) {
    return error;
  }
});