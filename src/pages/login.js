import React, { useState } from 'react'
import {
    auth,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword
} from '../firebase'
import { useDispatch } from 'react-redux'
import { login } from '../features/userSlice'

import { Grid, TextField, Button } from '@mui/material'
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
        <form display='flex' alignItems='center' justifyContent='center' direction='column' align='center' style={{ minHeight: '100vh', minWidth: '100vw'}}>
            <Grid container
                spacing={2}
                display='flex'
                justify="center"
                justifyContent='center'
                alignItems='center'
                direction='column'
                style={{ minHeight: '100vh', minWidth: '100%'}}
            >
                <Grid item xs={3} align="center">
                    <TextField
                        required
                        id='email-input'
                        name='email'
                        label='Email'
                        type='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        variant='outlined'
                        margin="dense"
                    />
                </Grid>
                <Grid item xs={3} align="center">
                    <TextField
                        required
                        id='password-input'
                        name='password'
                        label='Password'
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        margin="dense"
                    />
                </Grid>
                <Grid item xs={3} align="center">
                    <TextField
                        id='name-input'
                        name='name'
                        label='Name'
                        type='text'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        margin="dense"
                    />
                </Grid>
                <Grid item xs={3} align="center">
                    <TextField
                        id='profilePic-input'
                        name='ProfilePic'
                        label='Profile Picture URL'
                        type='text'
                        value={profilePic}
                        onChange={e => setProfilePic(e.target.value)}
                        margin="dense"
                    />
                </Grid>
                <Grid item xs={3} align="center" display='flex' direction='column'>
                    <Button variant='contained' color='primary' type='submit' onClick={loginToApp} style={{marginBottom: '24px'}}>
                        Login
                    </Button>
                    <span>Not a User?</span>
                    <Button variant='contained' color='primary' type='submit' onClick={register} style={{marginTop: '6px'}}>
                        Register Now
                    </Button>
                </Grid>
                
            </Grid>
        </form>
    )
}

export default Login