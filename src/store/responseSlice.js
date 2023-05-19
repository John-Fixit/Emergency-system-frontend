import { createSlice } from "@reduxjs/toolkit";
const responseSlice = createSlice({
    name: 'Response',
    initialState: {
        status: 'inActive',
        respondedMessage: [],
        activeMessage: null
    },
    reducers: {
        setActive(state, action){
            state.status = action.payload
        },
        setActiveMessage(state, action){
            state.activeMessage = action.payload;
        },
        setRespondedMessage(state, action){
            state.respondedMessage.push(action.payload);
        }
    }
})

export const responseActions = responseSlice.actions;
export default responseSlice;