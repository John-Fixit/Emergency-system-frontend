import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../URL";

// export const getUserDetailAction = createAsyncThunk("/user/detail", async(payload, {rejectWithValue})=>{
//     try{
//         const res = await axios.get(`${baseUrl}/org/get-org-details`)
//     }catch(err){
//         rejectWithValue(err?.response?.data);
//     }
// })


export const updateUserAction = createAsyncThunk("user/updateProfile", async(payload, {rejectWithValue})=>{
    try{
        const res = await axios.patch(``, payload);
        console.log(res?.data);
        return res?.data;
    }catch(err){
        return err?.response?.data
    }   
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        details: {},
        updateUserDetail: {
            loading: false,
            appError: null,
        }
    },
    reducers: {
        updateDetail(state, action){
            state.details = action.payload
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(updateUserAction.pending, (state, action)=>{
            state.updateUserDetail.loading = true;
            state.updateUserDetail.appError = null;
        })
        .addCase(updateUserAction.fulfilled, (state, action)=>{
            state.updateUserDetail.loading = false;
        })
        .addCase(updateUserAction.rejected, (state, action)=>{
            state.updateUserDetail.loading = false;
            state.updateUserDetail.appError = action.payload;
        })
    }
})

export const usersActions = userSlice.actions;
export default userSlice;