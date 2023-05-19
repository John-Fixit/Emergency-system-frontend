import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: 'messages',
    initialState: {
        fetchMessages: {},
        newMessages: [],
        checked: null
    },
    reducers: {
        setTotalMessage(state, action){
            const {data, error, isLoading} = action.payload;
            state.fetchMessages = {data, error, isLoading};
        },
        addNewMessage(state, action){
            state.newMessages.push(action.payload);
        },
        cancelNotification(state, action){
            const id = action.payload;
            state.newMessages = state.newMessages.filter((item)=>item._id!==id);
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