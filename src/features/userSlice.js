import { createSlice } from '@reduxjs/toolkit'
import { updateProfile, updatePassword, updateEmail } from 'firebase/auth'
import { auth } from '../firebase'
import { emailValidator, nameValidator, passwordValidator } from '../util/validation'

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
        update :  (state, action) => {
            // reference current user
            console.log('state : ', state)
            console.log('payload : ', action.payload)

            if(passwordValidator(action.payload.password)) {
                console.log('password is requesting to change')
                updatePassword(auth.currentUser, action.payload.password).then(() => {
                    // update successful
                }).catch(err => {
                    // an error occured
                    // ...
                })
            }
            if(nameValidator(action.payload.name)) {
                console.log('name is requesting to be updated')
                updateProfile(auth.currentUser, {
                    displayName : action.payload.name
                }).then(() => {
                    // profile updawted
                    // ...
                }).catch((err) => {
                    // an error occured
                })
                
            }
            if(emailValidator(action.payload.email)) {
                console.log('email is requesting change', action.payload.email)
                updateEmail(auth.currentUser, action.payload.email).then(() => {
                    // Email updated
                }).catch(err => {
                    // something has gone terribly wrong
                    console.log(err)
                })
            }
        }
    },
})

export const { login, logout, update } = userSlice.actions

// selectors
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;


