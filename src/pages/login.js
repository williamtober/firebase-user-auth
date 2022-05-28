import React, { useState } from 'react'
import {
    auth,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword
} from '../firebase'
import { useDispatch } from 'react-redux'
import { login } from '../features/userSlice'

import React from 'react'
import { Grid, TextField } from '@mui/material'
import { toHaveFormValues } from '@testing-library/jest-dom/dist/matchers'

export const Login = () => {
    // react hooks to localize input state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [profilePic, setProfilePic] = useState('')
    const dispatch = useDispatch()

    const loginToApp = (e) => {
        e.preventDefault()
        // firebase sign in || logic for validation
        signInWithEmailAndPassword(auth, email, password)
        // authorized user object returned from FB here 
        .then((userAuth) => {
            dispatch(login({
                email : userAuth.user.email,
                uid : userAuth.user.uid,
                displayName : userAuth.user.displayName,
                photoUrl : userAuth.user.photoURL
            }))
        }).catch(err => alert(err))
    }

    const register = () => {

        // RETURN ALERT IF NO NAME FOUND
        if(!name) {
            
            return alert('Please enter a full name')
        }
        // CREATE USER IF NAME FOUND
        createUserWithEmailAndPassword(auth, email, password)
        .then((userAuth) => {
            updateProfile(userAuth.user, {
                displayName : name,
                photoURL : profilePic
            })
            .then(
                dispatch(
                    login({email : userAuth.user.email,
                    uid : userAuth.user.uid,
                displayName : profilePic
            })))
            .catch((err) => {
                console.log("user can't be updated : ", err)
            })
        })
        .catch(err => {
            console.log('ERROR : ', err)
        })
    }

    return (
        <form>
            <Grid container alignItems='center' justify='center' direction='column'>
                <Grid item>
                    <TextField
                        id='email-input'
                        name='email'
                        label='email'
                        type='text'
                        value={e => setEmail(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id='password-input'
                        name='password'
                        label='password'
                        type='text'
                        value={e => setName(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id='name-input'
                        name='name'
                        label='name'
                        type='text'
                        value={e => setName(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id='profilePic-input'
                        name='ProfilePic'
                        label='ProfilePic'
                        type='text'
                        value={e => setProfilePic(e.target.value)}
                    />
                </Grid>
                <Button variant='contained' color='primary' type='submit'>
                    Register Now
                </Button>
                <span>Not a User?</span>
                <Button variant='contained' color='primary' type='submit'>
                    Register Now
                </Button>
                
            </Grid>
        </form>
    )
}

export default Login