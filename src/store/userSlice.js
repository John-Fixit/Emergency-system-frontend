import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../URL";

// get the organization detail
export const getOrgDetailAction = createAsyncThunk("/user/detail", async(payload, {rejectWithValue})=>{
    try{
        const res = await axios.get(`${baseUrl}/org/profile/${payload}`)
        return res?.data?.detail
    }catch(err){
        console.log(err?.response?.data);
        rejectWithValue(err?.response?.data);
    }
})
// update orgnaization detail
export const updateOrgAction = createAsyncThunk("user/updateProfile", async(payload, {rejectWithValue})=>{
    try{
        const res = await axios.patch(`${baseUrl}/org/update-org`, payload);
        return res?.data;
    }catch(err){
        return rejectWithValue(err?.response?.data);
    }
})

//get all organization
export const getAllOrgAction = createAsyncThunk("/org/all-org", async(_, {rejectWithValue})=>{
    try{
        const res = await axios.get(`${baseUrl}/org/allOrgs`)
        return res?.data?.result
    }catch(err){
        rejectWithValue(err?.response?.data);
    }
})
const userSlice = createSlice({
    name: 'user',
    initialState: {
        details: {},
        updateOrgDetail: {
            loading: false,
            appError: null,
        },
        allOrgs: {
            data: [],
            loading: false,
            appError: null
        }
    },
    reducers: {
        updateDetail(state, action){
            state.details = action.payload
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(updateOrgAction.pending, (state, action)=>{
            state.updateOrgDetail.loading = true;
            state.updateOrgDetail.appError = null;
        })
        .addCase(updateOrgAction.fulfilled, (state, action)=>{
            state.updateOrgDetail.loading = false;
        })
        .addCase(updateOrgAction.rejected, (state, action)=>{
            state.updateOrgDetail.loading = false;
            state.updateOrgDetail.appError = action.payload;
        })
        //get org detail
        .addCase(getOrgDetailAction.fulfilled, (state, action)=>{
            state.details = action.payload;
        })
        //get all organisation
        .addCase(getAllOrgAction.pending, (state)=>{
            state.allOrgs.loading = true;
            state.allOrgs.data = []
        })
        .addCase(getAllOrgAction.fulfilled, (state, action)=>{
            state.allOrgs.loading = false;
            state.allOrgs.data = action.payload
        })
        .addCase(getAllOrgAction.rejected, (state, action)=>{
            state.allOrgs.isLoading = false;
            state.allOrgs.appError = action.payload
        })
    }
})

export const usersActions = userSlice.actions;
export default userSlice;