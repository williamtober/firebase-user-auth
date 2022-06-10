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
    // toggles if user wants to register
    const [newUser, setNewUser] = useState(false)
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

    const registerStyle = !newUser ? {display: 'none'} : {display: 'flex'}

    return (
        <div className='flex flex-col items-center justify-center w-[100vw] h-[100vh] bg-blue-300'>
            
            <form className='rounded-xl w-[400px] h-[600px] flex flex-col items-start justify-center gap-y-8 p-10 bg-[#f4f5f7] shadow border-0'>
                <h2 className='w-full text-center mb-10 text-2xl font-bold text-gray-500'>User {!newUser ? <span>Login</span> : <span>Registration</span>}</h2>
                <div className='w-full flex flex-row align-center justify-between'>
                    <label className='font-bold text-black h-full hidden items-center justify-start'>Email</label>
                    <input
                        required 
                        className='rounded py-1 flex items-center justify-start pl-2 focus:shadow w-full'
                        placeholder='Email'
                        type='text'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className='w-full flex flex-row align-center justify-between'>
                    <label className='font-bold text-black h-full hidden items-center justify-start'>Password</label>
                    <input 
                        className='rounded py-1 flex items-center justify-start pl-2 focus:shadow w-full'
                        placeholder='Password'
                        type='text'
                        value={password}
                        onChange={e => setPassword(e.target.value)} 
                    />
                </div>
                <div style={registerStyle} className='w-full flex flex-row align-center justify-between'>
                    <label className='font-bold text-black h-full hidden items-center justify-start'>Name</label>
                    <input 
                        className='rounded py-1 flex items-center justify-start pl-2 focus:shadow w-full'
                        placeholder='Full Name'
                        type='text'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div style={registerStyle} className="w-full flex-row align-center justify-between">
                    <label className='font-bold text-black h-full hidden items-center justify-start'>Profile Picture</label>
                    <input 
                        className='rounded py-1 flex items-center justify-start pl-2 focus:shadow w-full'
                        placeholder='URL to Profile Picture'
                        type='text'
                        value={profilePic}
                        onChange={e => setProfilePic(e.target.value)}
                    />
                </div>
                <div className='w-full mt-5 flex flex-col justify-center align-center'>
                    <input style={newUser ? {display: 'none'} : {display: 'flex'}} onClick={loginToApp} className='bg-blue-500 text-gray-50 font-semibold px-full py-2 rounded justify-center' type='button' value='Sign In'>
                    </input>
                    {/* use hooks to hide other values, until user clicks on register. */}
                    <span style={newUser ? {display: 'none'} : {display: 'flex'}} className='w-full mt-2 mb-2 text-center justify-center'>Not a User? <span className='text-blue-400 ml-1' onClick={e => setNewUser(!newUser)}>Register Today. </span></span>
                    <input style={registerStyle} onClick={register} className='bg-blue-500 text-gray-50 font-semibold py-2 rounded justify-center' type='button' value='Register'>
                        
                    </input>
                    <span style={!newUser ? {display: 'none'} : {display: 'flex'}} className='w-full mt-2 mb-2 text-center justify-center'>Already Registered? <span className='text-blue-400 ml-1' onClick={e => setNewUser(!newUser)}>Login Here. </span></span>
                </div>
                
            </form>
        </div>
        
        
    )
}

export default Login