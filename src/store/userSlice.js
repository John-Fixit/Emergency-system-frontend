import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        details: {},
    },
    reducers: {
        updateDetail(state, action){
            state.details = action.payload
        }
    },
})

export const usersActions = userSlice.actions;
export default userSlice;