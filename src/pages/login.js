import React, { useState } from 'react'
import {
    auth,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword
} from '../firebase'
import { useDispatch } from 'react-redux'
import { login } from '../features/userSlice'

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
        <div className='flex flex-col items-center justify-center w-[100vw] h-[100vh]'>
            <form className='rounded-xl w-[400px] h-[600px] flex flex-col items-start justify-center gap-y-8 p-10 bg-green-400 shadow-2xl'>
                <div className='w-full flex flex-row align-center justify-between'>
                    <label className='font-bold text-black h-full flex items-center justify-start'>Email</label>
                    <input
                        required 
                        className='rounded py-1 flex items-center justify-start pl-2 focus:shadow'
                        type='text'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className='w-full flex flex-row align-center justify-between'>
                    <label className='font-bold text-black h-full flex items-center justify-start'>Password</label>
                    <input 
                        className='rounded py-1 flex items-center justify-start pl-2 focus:shadow'
                        type='text'
                        value={password}
                        onChange={e => setPassword(e.target.value)} 
                    />
                </div>
                <div className='w-full flex flex-row align-center justify-between'>
                    <label className='font-bold text-black h-full flex items-center justify-start'>Name</label>
                    <input 
                        className='rounded py-1 flex items-center justify-start pl-2 focus:shadow'
                        type='text'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className='w-full flex flex-row align-center justify-between'>
                    <label className='font-bold text-black h-full flex items-center justify-start'>Profile Picture</label>
                    <input 
                        className='rounded py-1 flex items-center justify-start pl-2 focus:shadow'
                        type='text'
                        value={profilePic}
                        onChange={e => setProfilePic(e.target.value)}
                    />
                </div>
                <div className='w-full mt-12 flex flex-col justify-center align-center'>
                    <input onClick={loginToApp} className='bg-white text-black px-full py-2 rounded' type='button' value='Sign In'>
                    </input>
                    {/* use hooks to hide other values, until user clicks on register. */}
                    <span className='w-full mt-8 mb-2 text-center'>Not a User?</span>
                    <input onClick={register} className='bg-white text-black px-full py-2 rounded' type='button' value='Register'>
                    </input>
                </div>
                
            </form>
        </div>
        
        
    )
}

export default Login