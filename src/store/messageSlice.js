import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: 'messages',
    initialState: {
        newMessages: [],
        checked: null
    },
    reducers: {
        addNewMessage(state, action){
            state.newMessages.push(action.payload);
        },
        checkMessage(state){
            state.checked = !state.checked
            if(state.checked){
                state.newMessages = [];
            }
        }
    }
});

export const messageActions = messageSlice.actions;
export default messageSlice;