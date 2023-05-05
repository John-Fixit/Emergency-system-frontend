import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import userSlice from './userSlice';
import messageSlice from './messageSlice';


const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        user: userSlice.reducer,
        newMessage: messageSlice.reducer
    }
});

export default store;