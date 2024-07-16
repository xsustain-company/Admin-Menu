import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Include Both Helper File with needed methods
import {
    getJobApplicationList as getJobApplicationListApi,
    addNewJobApplicationList as addNewJobApplicationListApi,
    updateJobApplicationList as updateJobApplicationListApi,
    deleteJobApplicationList as deleteJobApplicationListApi,

    getJobCandidateList as getCandidateListApi,
    addJobCandidate as addCandidateApi,
    updateJobCandidate as updateCandidateApi,
    deleteJobCandidate as deleteCandidateApi,

    getCandidateGrid as getCandidateGridApi,
    addCandidateGrid as addCandidateGridApi,

    getcategoryList as getcategoryListApi,
    addcategoryList as addcategoryListApi
} from "../../helpers/fakebackend_helper";

export const getApplicationList = createAsyncThunk("jobs/getJobApplicationList", async () => {
    try {
        const response = getJobApplicationListApi();
        return response;
    } catch (error) {
        return error;
    }
});

export const addNewJobApplicationList = createAsyncThunk("jobs/addNewJobApplicationList", async (job: any) => {
    try {
        const response = addNewJobApplicationListApi(job);
        const data = await response;
        toast.success("Job Application Added Successfully", { autoClose: 3000 });
        return data;
    } catch (error) {
        toast.error("Job Application Added Failed", { autoClose: 3000 });
        return error;
    }
});

export const updateJobApplicationList = createAsyncThunk("jobs/updateJobApplicationList", async (job: any) => {
    try {
        const response = updateJobApplicationListApi(job);
        const data = await response;
        toast.success("Job Application Updated Successfully", { autoClose: 3000 });
        return data;
    } catch (error) {
        toast.error("Job Application Updated Failed", { autoClose: 3000 });
        return error;
    }
});

export const deleteJobApplicationList = createAsyncThunk("jobs/deleteJobApplicationList", async (job: any) => {
    try {
        const response = deleteJobApplicationListApi(job);
        const data = await response;
        toast.success("Job Application Deleted Successfully", { autoClose: 3000 });
        return data;
    } catch (error) {
        toast.error("Job Application Deleted Failed", { autoClose: 3000 });
        return error;
    }
});

// candidate List
export const getCandidateList = createAsyncThunk("jobs/getJobCandidateList", async () => {
    try {
        const response = getCandidateListApi();
        return response;
    } catch (error) {
        return error;
    }
});

export const addCandidate = createAsyncThunk("jobs/addJobCandidate", async (candidate: any) => {
    try {
        const response = addCandidateApi(candidate);
        const data = await response;
        toast.success("Candidate Added Successfully", { autoClose: 2000 });
        return data;
    } catch (error) {
        toast.error("Candidate Added Failed", { autoClose: 2000 });
        return error;
    }
});

export const updateCandidate = createAsyncThunk("jobs/updateJobCandidate", async (candidate: any) => {
    try {
        const response = updateCandidateApi(candidate);
        const data = await response;
        toast.success("Candidate Updated Successfully", { autoClose: 2000 });
        return data;
    } catch (error) {
        toast.error("Candidate Updated Failed", { autoClose: 2000 });
        return error;
    }
});

export const deleteCandidate = createAsyncThunk("jobs/deleteJobCandidate", async (id: any) => {
    try {
        const response = deleteCandidateApi(id);
        toast.success("Candidate Deleted Successfully", { autoClose: 2000 });
        return { id, ...response };
    } catch (error) {
        toast.error("Candidate Deleted Failed", { autoClose: 2000 });
        return error;
    }
});

// candidate grid
export const getCandidateGrid = createAsyncThunk("jobs/getJobCandidateGrid", async () => {
    try {
        const response = getCandidateGridApi();
        return response;
    } catch (error) {
        return error;
    }
});

export const addCandidateGrid = createAsyncThunk("jobs/addJobCandidateGrid", async (candidate: any) => {
    try {
        const response = addCandidateGridApi(candidate);
        const data = await response;
        toast.success("Candidate Added Successfully", { autoClose: 2000 });
        return data;
    } catch (error) {
        toast.error("Candidate Added Failed", { autoClose: 2000 });
        return error;
    }
});


// Job category
export const getCategoryList = createAsyncThunk("jobs/getcategoryList", async () => {
    try {
        const response = getcategoryListApi();
        return response;
    } catch (error) {
        return error;
    }
});

export const addcategoryList = createAsyncThunk("jobs/addcategoryList", async (category: any) => {
    try {
        const response = addcategoryListApi(category);
        const data = await response;
        toast.success("Category Added Successfully", { autoClose: 3000 });
        return data;
    } catch (error) {
        toast.error("Category Added Failed", { autoClose: 3000 });
        return error;
    }
});

