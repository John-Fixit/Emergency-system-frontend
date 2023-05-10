import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import userSlice from './userSlice';
import messageSlice from './messageSlice';
import responseSlice from './responseSlice';


const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        user: userSlice.reducer,
        message: messageSlice.reducer,
        response: responseSlice.reducer
    }
});

export default store;