import { createSlice } from '@reduxjs/toolkit'
import { updateProfile } from 'firebase/auth'
import { auth } from '../firebase'

// redux slices are supposed to be seperate, and pertain to one category of data i.e. user : { get, post, delete, put regarding user data}
export const userSlice = createSlice({
    name : 'user',
    initialState : {
        user : null,
    },
    reducers : {
        // set state to current payload
        login : (state, action) => {
            state.user = action.payload
        },
        // clear out the user state
        logout : (state) => {
            state.user = null
        },
        update : (state, action) => {
            console.log('state : ', state)
            console.log('payload : ', action.payload)

        }
    },
})

export const { login, logout, update } = userSlice.actions

// selectors
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;


