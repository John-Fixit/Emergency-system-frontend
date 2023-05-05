import {createSlice} from '@reduxjs/toolkit';



const authSlice = createSlice({
    name: 'Auth',
    initialState: {
        isLoggedIn: false,
        token: null
    },
    reducers: {
        login(state, action){
            const {status, token} = action.payload
            if(token){
               state.token = token
               state.isLoggedIn = status
            }
            else{
                state.isLoggedIn = false
            }
        },
        logout(state){

        }
    }
});

export const authActions = authSlice.actions;
export default authSlice;